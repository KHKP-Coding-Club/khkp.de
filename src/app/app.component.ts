import {Component, AfterViewInit} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Router, NavigationStart, ActivatedRoute, NavigationEnd} from '@angular/router';
import any = jasmine.any;
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import {SteamService} from "./steam.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SteamService]
})
export class AppComponent implements AfterViewInit{



  access: boolean = false;
  validated: boolean = false;
  loggedIn: boolean = false;
  showApp:boolean = false;
  user: any;
  error: any;
  title: string;
  isInChildView: boolean = false;
  loaded:boolean = false;
  userObject: FirebaseObjectObservable<any>;
  fcm:any;
  toast: any;

  constructor(public af: AngularFire, private router: Router, private route: ActivatedRoute, private location: Location, public steam: SteamService) {
    this.fcm = firebase.messaging();


    this.fcm.onMessage((data)=>{
      this.toast.text=data.notification.body;
      this.toast.open();
    })

    this.user = undefined;
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event:NavigationStart) => {
        let currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
          currentRoute = currentRoute.children[0];
        }
        console.log(currentRoute.snapshot.url);
      });

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
        let route = this.route.snapshot;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.title = route.data['title'];
        this.isInChildView = route.data['isDetail'];
        console.log(this.title+" "+this.isInChildView)
    });



    this.af.auth.subscribe(auth => {
      if(auth) {
        this.user = auth.auth;

        this.fcm.requestPermission()
          .then(() => {
            console.log('Notification permission granted.');
            this.fcm.getToken()
              .then((currentToken) => {
                if (currentToken) {
                  console.log("save Token:")
                  //this.af.database.object("fcm/"+this.user.uid).set(currentToken);
                  //this.steam.configFCM(this.user.uid,currentToken).subscribe(res=>console.log(res));
                  console.log(currentToken);
                } else {
                  // Show permission request.
                  console.log('No Instance ID token available. Request permission to generate one.');
                  // Show permission UI.
                }
              })
              .catch(function(err) {
                console.log('An error occurred while retrieving token. ', err);
              });

            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            // ...
          })
          .catch(function(err) {
            console.log('Unable to get permission to notify.', err);
          });
        this.fcm.onTokenRefresh(() => {
          this.fcm.getToken()
            .then((refreshedToken) => {
              console.log('Token refreshed.');
              // Indicate that the new Instance ID token has not yet been sent to the
              // app server.
              console.log(refreshedToken);

              //this.af.database.object("fcm/"+this.user.uid).set(refreshedToken);
              //this.steam.configFCM(this.user.uid,refreshedToken);
              // Send Instance ID token to app server.
              // ...
            })
            .catch(function(err) {
              console.log('Unable to retrieve refreshed token ', err);
            });
        });



        this.loggedIn = true;
        this.userObject = this.af.database.object("validUsers/"+this.user.uid);
        this.userObject.subscribe((snapshot) =>{
          console.log(snapshot);
          this.loaded = true;
          this.router.navigateByUrl('news');
          if(snapshot.$exists()){
            this.access=true;
            this.showApp = true;
          }else{
            this.access = false;
            this.showApp = false;
          }
        })
      }else{
        this.loaded = true;
        this.loggedIn = false;
        this.showApp = false;
      }
    });
  }

  logout() {
    this.af.auth.logout();
    this.router.navigateByUrl('');
  }

  loginGoogle() {
    this.loaded = false;
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.router.navigate(['/news']);
      }).catch(
      (err) => {
        this.error = err;
      })
  }

  drawerSelected(){
    var drawer :any = document.getElementById('drawer');
    if(!drawer.persistent){
    drawer.close();
    }
  }

  goBack(){
    this.location.back();
  }

  ngAfterViewInit(): void {
    this.toast = document.getElementById('toast');
  }
}
