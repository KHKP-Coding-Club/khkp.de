import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class SteamService {

  constructor(private http: Http) {
  }

  getAuthcode(secret: string): Observable<string> {
    return this.http.get("https://us-central1-khkp-7f1ba.cloudfunctions.net/authCode?secret="+secret)
      .map(this.extractData)
      .catch(this.handleError);
  }


  configFCM(uid:string, token: string): Observable<string>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("https://us-central1-khkp-7f1ba.cloudfunctions.net/deviceGroup",{"token":token,"uid":uid}, options).map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body.authCode || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}


