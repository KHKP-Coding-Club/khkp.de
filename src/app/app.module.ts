import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './auth.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TeamspeakComponent } from './teamspeak/teamspeak.component';
import {routes} from "./app.routes";
import { NewsComponent } from './news/news.component';
import { NewNewsComponent } from './new-news/new-news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { AccountComponent } from './account/account.component';
import { LigaComponent } from './liga/liga.component';
import { SmurfsComponent } from './smurfs/smurfs.component';
import { LigaDetailComponent } from './liga-detail/liga-detail.component';
import { GamblingComponent } from './gambling/gambling.component';



export const firebaseConfig = {
  apiKey: "AIzaSyBZNf-wSXD4phl1GuWrLg9GTCixyTlnsKE",
  authDomain: "khkp-7f1ba.firebaseapp.com",
  databaseURL: "https://khkp-7f1ba.firebaseio.com",
  storageBucket: "khkp-7f1ba.appspot.com",
  messagingSenderId: "816075675861"
};


@NgModule({
  declarations: [
    AppComponent,
    PolymerElement('paper-button'),
    PolymerElement('paper-toolbar'),
    PolymerElement('paper-icon-button'),
    PolymerElement('paper-input'),
    PolymerElement('iron-icon'),
    PolymerElement('paper-item'),
    PolymerElement('paper-listbox'),
    PolymerElement('app-drawer-layout'),
    PolymerElement('app-drawer'),
    PolymerElement('app-header'),
    PolymerElement('app-header-layout'),
    PolymerElement('paper-card'),
    PolymerElement('paper-scroll-header-panel'),
    PolymerElement('paper-fab'),
    PolymerElement('paper-textarea'),
    PolymerElement('paper-input'),
    PolymerElement('vaadin-upload'),
    PolymerElement('vaadin-combo-box'),
    PolymerElement('vaadin-date-picker'),
    PolymerElement('paper-ripple'),
    PolymerElement('paper-toggle-button'),
    LoginComponent,
    TeamspeakComponent,
    NewsComponent,
    NewNewsComponent,
    NewsDetailComponent,
    AccountComponent,
    LigaComponent,
    SmurfsComponent,
    LigaDetailComponent,
    GamblingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
