import {Component, OnInit, AfterViewInit} from '@angular/core';
import {
  FirebaseListObservable, AngularFire, AngularFireDatabase, FirebaseObjectObservable} from "angularfire2";
import {Router} from "@angular/router";
import Reference = firebase.storage.Reference;
import * as firebase from 'firebase';

@Component({
  selector: 'app-new-news',
  templateUrl: './new-news.component.html',
  styleUrls: ['./new-news.component.css'],
})
export class NewNewsComponent implements OnInit, AfterViewInit {

  news: any;
  storageRef: any;
  downloadUrl: any;
  imageRef:any;
  user:any;

  constructor(public af: AngularFire, private router: Router ) {
    this.user = undefined;
    this.news = af.database.object("/news").$ref;
    //console.log(firebase.storage().ref().child('Profile.png').getDownloadURL());
    this.storageRef = firebase.storage().ref();

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.user = auth.auth;
      }else{
        this.user = undefined;
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
   /* var upload = document.getElementById('upload');
    upload.i18n.addFiles.one = "Datei auswählen!"*/
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
       this.downloadUrl = task.snapshot.downloadURL;
       //event.preventDefault();
     });

   });
  }
  /*filebuttoni(event){
    let files = event.srcElement.files[0];
    let upload=document.getElementById("upload");
    console.log(files.name)
    this.path="images/"+files.name;
    this.storageref=this.storage.child(this.path);
    let task=this.storageref.put(files);
  }*/

  validate(){

    var titelInput :any = document.getElementById('title');
    var textInput :any = document.getElementById('text');

    if( titelInput.validate() && textInput.validate()){
      const newId = this.news.push(null).key;
      this.news.child(newId).set({
        author:this.user.displayName,
        content:textInput.value,
        id:newId,
        img:this.downloadUrl,
        title:titelInput.value,
        time: {".sv":"timestamp"}
      })
      this.router.navigate(['/news']);
    }

  }

}
