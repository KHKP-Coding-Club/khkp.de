import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {SteamService} from "../steam.service";

@Component({
  selector: 'app-teamspeak',
  templateUrl: './teamspeak.component.html',
  styleUrls: ['./teamspeak.component.css'],
})
export class TeamspeakComponent implements OnInit {

  tsOnline: FirebaseListObservable<any> = null;
  tsAll: FirebaseListObservable<any> = null;
  loaded: boolean = false;
  onlineLoaded: boolean = false;
  allLoaded: boolean = false;

  constructor(public af: AngularFire) {
    this.tsOnline = af.database.list('/tsOnline', {
      query:{
        orderByKey: true
      }
    });

    this.tsAll = af.database.list('/tsAll', {
      query:{
        limitToLast: 10,
        orderByChild: "lastseen"
      }
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;

    this.tsOnline.subscribe((snapshot)=>{
        this.onlineLoaded= true;
        if(this.onlineLoaded && this.allLoaded){
          this.loaded = true;
        }
    })
    this.tsAll.subscribe((snapshot)=>{
      this.allLoaded = true;
      if(this.onlineLoaded && this.allLoaded){
        this.loaded = true;
      }
    })
  }

  ngOnInit() {
  }

  openTs(cid){
    location.href ="ts3server://ts.khkp.de?cid="+cid;
  }

}
