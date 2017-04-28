/**
 * Created by fd on 15.02.2017.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.service';
//import { SignupComponent } from './signup/signup.component';
//import { EmailComponent } from './email/email.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent} from './news-detail/news-detail.component';
import { TeamspeakComponent } from './teamspeak/teamspeak.component';
import { AccountComponent } from './account/account.component';
import { LigaComponent } from './liga/liga.component';
import { SmurfsComponent } from './smurfs/smurfs.component';
import { LigaDetailComponent } from './liga-detail/liga-detail.component';
import { GamblingComponent } from './gambling/gambling.component';
//import { LandingComponent } from './landing/landing.component';
import { NewNewsComponent } from './new-news/new-news.component';


export const router: Routes = [
  //{ path: '', redirectTo: '/news', pathMatch: 'full' },
  //{ path: '', component:LandingComponent},
  { path: 'login', component: LoginComponent, data:{title: 'Login', isDetail: false} },
  { path: 'account', component: AccountComponent, data:{title: 'Account', isDetail: true} },
  { path: 'liga', component: LigaComponent, data:{title: 'Liga', isDetail: false} },
  { path: 'smurfs', component: SmurfsComponent, data:{title: 'Smurfs', isDetail: false} },
  { path: 'newNews', component: NewNewsComponent, data:{title: 'Neue News Erstellen', isDetail: true} },
  { path: 'newMatch', component: LigaDetailComponent, data:{title: 'Neues Macth Erstellen', isDetail: true} },
  //{ path: 'signup', component: SignupComponent },
  //{ path: 'login-email', component: EmailComponent },
  //{ path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard], data:{title: 'News', isDetail: false}},
  {path: 'news/:id', component: NewsDetailComponent, canActivate: [AuthGuard], data:{title: 'News Detail', isDetail: true}},
  { path: 'teamspeak', component: TeamspeakComponent, canActivate: [AuthGuard], data:{title: 'Teamspeak', isDetail: false}},
  { path: 'skindump', component: GamblingComponent, canActivate: [AuthGuard], data:{title: 'Skin Dump', isDetail: false}},
  //{ path: 'liga', component: LigaComponent, canActivate: [AuthGuard] },
  //{path: '**', redirectTo: 'news'}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
