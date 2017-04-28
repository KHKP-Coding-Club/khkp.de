import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {SteamService} from "../steam.service";

@Component({
  selector: 'app-smurfs',
  templateUrl: './smurfs.component.html',
  styleUrls: ['./smurfs.component.css'],
  providers: [SteamService]
})
export class SmurfsComponent implements OnInit {

  loaded: boolean = false;
  smurfs: FirebaseListObservable<any> = null;
  authCode: string;
  user: any;

  constructor(public af: AngularFire, private http: Http, private steam: SteamService) {

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.user = auth.auth;
      }
    });

    this.smurfs = af.database.list('/smurfs', {
      query:{
        orderByKey: true
      }
    });

    this.smurfs.subscribe((snapshot)=>{
        this.loaded = true;
    })
  }

  borrow(secret:string, key:string){
    this.af.database.object("smurfs/"+key+"/borrowedBy").set(this.user.uid);
    this.af.database.object("smurfs/"+key+"/borrowedByName").set(this.user.displayName);
    this.getAuthCode(secret);
  }

  handBack(key:string){
    this.af.database.object("smurfs/"+key+"/borrowedBy").set(false);
    this.af.database.object("smurfs/"+key+"/borrowedByName").remove();
  }

  getAuthCode(secret:string){
    this.steam.getAuthcode(secret).subscribe((code)=>{
      this.authCode = code;
    });
  }



  ngOnInit() {
  }

}
