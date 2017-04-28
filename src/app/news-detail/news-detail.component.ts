import {Component, OnInit, AfterContentInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit, AfterContentInit {

  id: number;
  newsOb: FirebaseObjectObservable<any>;
  news: any;
  loaded: boolean = false;
  af: any;

  constructor(private route: ActivatedRoute,
              private router: Router, af: AngularFire) {
    this.af = af;
  }

  ngOnInit() {
   this.route.params.subscribe(params => {
     this.id = params['id'];

   })
  }

  ngAfterContentInit(){
    this.newsOb = this.af.database.object('/news/'+this.id);
    this.newsOb.subscribe((snapshot)=>{
      this.news = snapshot;
      this.loaded=true;
    })
  }

  openDialog(){
    var dialog: any =document.getElementById("modal");
    dialog.open();
  }

}
