import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {DomAdapter} from "@angular/platform-browser/src/dom/dom_adapter";
import {FirebaseListObservable, AngularFire} from "angularfire2";


@Component({
  selector: 'app-gambling',
  templateUrl: './gambling.component.html',
  styleUrls: ['./gambling.component.css']
})
export class GamblingComponent implements OnInit {
  canvas :any;
  loaded: any;
  startAngle = 0;
  arc = 0;
  spinTimeout = null;

  spinArcStart = 10;
  spinTime = 0;
  spinTimeTotal = 0;
  item;
  ctx;

  cw;
  ch;
  cx;
  cy;

  wheel;

  playersOb : FirebaseListObservable<any>;
  players: Array<any> = [];

  myColor = ["#ECD078", "#D95B43", "#C02942", "#542437", "#53777A", "#887766", "#293203"];

  myData = [10, 10];

  constructor(af: AngularFire) {
    this.loaded = true;
    this.playersOb = af.database.list('gambling/currentRound/players');
    this.playersOb.subscribe((data)=>{
      this.players = data;
      this.plotData();
    })
  }




  ngOnInit() {
    this.canvas = document.getElementById("wheel");
    this.ctx = this.canvas.getContext("2d");
    this.cw=this.canvas.width=400;
    this.ch=this.canvas.height=400;
    this.cx=this.cw/2;
    this.cy=this.ch/2;
    this.wheel={
      cx:this.cw/2,
      cy:this.ch/2,
      radius:Math.min(this.cw,this.ch)/2-20,
      startAngle:0,
      endAngle: 0,
      totalSteps:360,
      currentStep:0,
    }

  }

  getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  clacAngle(min,max){
    return Math.PI/((360/this.getRandomInt(360-min,360-max))/2)+(20*Math.PI);
  }

  draw(){
    this.wheel.endAngle= this.clacAngle(90,90);
    this.wheel.currentStep = 0;
    requestAnimationFrame(() => this.animate());
  }

  animate(){
    if(this.wheel.currentStep>this.wheel.totalSteps){ return;}
    this.drawAll(this.wheel);
    this.wheel.currentStep++;
    requestAnimationFrame(() => this.animate());
  }




  easing(w){
  var t=w.currentStep;
  var b=w.startAngle;
  var d=w.totalSteps;
  var c=w.endAngle-w.startAngle;
  // Penner's OutQuart
  return (-c*((t=t/d-1)*t*t*t-1)+b+w.startAngle);
}

  drawAll(w){
    let wheelCanvas = this.canvas;
    var angle= this.easing(w);
    console.log(angle);
    this.ctx.save();
    //this.ctx.clearRect(0,0,400,400);
    //this.ctx.translate(200,200);
    //this.ctx.rotate(angle);
    this.startAngle = angle;
    this.plotData();
    //this.ctx.drawImage(this.canvas,-this.canvas.width/2,-this.canvas.height/2, 400, 400);
    //this.ctx.rotate(-angle);
    //this.ctx.translate(-200,-200);
    this.ctx.restore();

    //this.ctx.drawImage(arrow,cx-arrow.width/2,44);
  }

  getTotal() {
    var myTotal = 0;
    for (var j = 0; j < this.myData.length; j++) {
      myTotal += (typeof this.myData[j] == 'number') ? this.myData[j] : 0;
    }
    //return myTotal;
    return 20;
  }

  plotData() {
  var canvas;
  var ctx;
  var lastend = 0;
  var myTotal = this.getTotal();


  canvas = this.canvas;
  ctx = this.ctx;
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  for (var i = 0; i < this.myData.length; i++) {
    let tickets = (this.players[i].endTicket - this.players[i].startTicket) + 1;
    console.log(tickets)
    this.arc = lastend + (Math.PI * 2 * (this.myData[i] / myTotal))
    var angle = this.startAngle + this.arc;
    ctx.fillStyle = this.myColor[i];
    ctx.beginPath();

    ctx.moveTo(200, 200);

    ctx.arc(200, 200, 200, this.startAngle + lastend, this.startAngle + this.arc, false);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.lineTo(200, 200);
    ctx.stroke();
    ctx.fill();

    lastend += Math.PI * 2 * (this.myData[i] / myTotal);


  }

  /*//draw middle circle
  ctx.beginPath();
  ctx.arc(100, 100, 100 * 0.1, 0, 2 * Math.PI);
  ctx.stroke;
  ctx.fillStyle = 'white';
  ctx.fill();

  //draw arrow
  ctx.beginPath();
  ctx.moveTo(100, 92);
  ctx.lineTo(130, 70);
  ctx.lineTo(108, 100);
  ctx.fillStyle = 'white';
  ctx.fill();*/


}
}
