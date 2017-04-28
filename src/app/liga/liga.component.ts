import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css']
})
export class LigaComponent implements OnInit {

  user: any;
  items: any;
  loaded: boolean;

  constructor(public af: AngularFire, private router: Router) {
    this.items = af.database.list('/liga', {
      query:{
        orderByChild: "date"
      }
    }).do(
      x=>{
        this.loaded=true
      }
    )
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.user = auth.auth;
      }
    });
  }

  generateArray(obj){
    if(obj){
      return Object.keys(obj).map((key)=>{ return obj[key]});
    }else{
      return [];
    }
  }

  isInGame(obj){
   /* let isInGame: boolean = false;
   Object.keys(obj).forEach((player)=>{
     if(player==this.user.uid) isInGame=true;
   });
   return isInGame;*/
   if(obj.players){
   if(Object.keys(obj.players).indexOf(this.user.uid)==-1){
     return false;
   }else{
     return true;
   }
   }else{
     return false;
   }
  }

  join(game:any){
    this.af.database.object('/liga/'+game.$key+'/players/'+this.user.uid).set({
      name: this.user.displayName
    });
  }

  leave(game:any){
    this.af.database.object('/liga/'+game.$key+'/players/'+this.user.uid).remove();
  }

  ngOnInit() {
  }

}
