import {Component, OnInit, OnDestroy} from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import {isUndefined} from "util";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {



  items: any;
  loaded: boolean;


  constructor(public af: AngularFire, private router: Router) {

  }

  ngOnInit(){
    this.items = this.af.database.list('/news', {
    }).do(
      x=>{this.loaded=true}
    )
    this.items.subscribe(data=>{
      console.log(data);
    })
  }


  onSelect(news:any) {
    //this.router.navigate(['/newsDetail;id=hallo']);
    this.router.navigate(['/news', news.id]);
  }



}
