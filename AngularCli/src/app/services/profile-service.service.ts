import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class ProfileServiceService {

  constructor(
    private httpThang: Http
  ) { }

  getProfile(){
    return this.httpThang
    .get(
      `${environment.apiBase}/api/profile`,
      {withCredentials: true }
    )
    //parse the json
    .map(res => res.json());
  }//close specific recipe


}
