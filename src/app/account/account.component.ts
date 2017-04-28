import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import Reference = firebase.storage.Reference;
import * as firebase from 'firebase';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {

  selected:number=0;
  user: any;
  imgUrl: string;
  storageRef: any;
  imageRef: any;

  constructor(public af: AngularFire) {
    this.storageRef = firebase.storage().ref();
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.user = auth.auth;
        this.imgUrl = this.user.photoURL;
        console.log(this.user.photoURL);
        var userInput :any = document.getElementById('username');
        userInput.value = this.user.displayName;
        var urlInput :any = document.getElementById('tradeurl');

        var urlRef: FirebaseObjectObservable<any> =  this.af.database.object('users/'+this.user.uid+'/tradeUrl')
        urlRef.subscribe((snap)=>{
          console.log("trade"+JSON.stringify(snap));
          urlInput.value = snap.$value;
        })
      }
    });

    var upload:any  =document.getElementById("upload");
    upload.addEventListener('upload-request', (event:any) => {
      event.preventDefault();
      this.storageRef = firebase.storage().ref();
      this.imageRef=this.storageRef.child(event.detail.file.name);
      var task=this.imageRef.put(event.detail.file);
      task.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        upload.files = [{name: event.detail.file.name,status:'Hochladen...', progress: progress, complete: false}]
        /*event.detail.file.status = "Hochladen..."
         event.detail.file.uploading = true;
         event.detail.file.progress = 100;*/
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },(error) => {
        console.log(error)
        upload.files = [{name: event.detail.file.name,error: "Es ist ein Fehler aufgetreten!", complete: false}]
      }, () =>{
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        upload.files = [{name: event.detail.file.name, progress: 100, complete: true}]
        console.log("done")
        this.imgUrl = task.snapshot.downloadURL;
        //event.preventDefault();
      });

    });
  }

  tabChanged(event) {
    console.log(event.detail.value);
    this.selected = parseFloat(event.detail.value);
  }

  validate(){
    var toast :any = document.getElementById('toast');
    var userInput :any = document.getElementById('username');
    if(userInput.validate()){
    //this.user.sendEmailVerification();
      this.user.updateProfile({
        displayName: userInput.value,
        photoURL: this.imgUrl
      }).then(()=>{
        toast.text="Accountdaten geändert!"
        toast.open();
      },(error)=>{
        toast.text="Fehler! Daten nicht geändert!"
        toast.open();
      });
    }
  }

  saveSteam(){
    var urlInput :any = document.getElementById('tradeurl');
    if(urlInput.validate()){
      var steamID = urlInput.value.substring(urlInput.value.indexOf('=')+1,urlInput.value.indexOf('=')+10);
      this.af.database.object('users/'+this.user.uid).set({tradeUrl:urlInput.value, steamID: steamID});
      this.af.database.object('steamUsers/'+steamID).set({tradeUrl:urlInput.value, userID: this.user.uid});
    }
  }
}
