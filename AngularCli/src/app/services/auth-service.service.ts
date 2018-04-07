import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthServiceService {

  constructor(
    private httpThang: Http
  ) { }

  login(componentInfo) {
      return this.httpThang
        .post(
          `${environment.apiBase}/api/login`,
          // Form body information to send to the back end (req.body)
          {
            blahEmail: componentInfo.email,
            blahPassword: componentInfo.password
          },
          // Send the cookies across domains
          { withCredentials: true }
        )
        // Convert from observable to promise
        .toPromise()
        // Parse the JSON
        .then(res => res.json());
  } // close login()


checklogin() {
      return this.httpThang
        .get(
          `${environment.apiBase}/api/checklogin`,
          // Send the cookies across domains
          { withCredentials: true }
        )
        // Convert from observable to promise
        .toPromise()
        // Parse the JSON
        .then(res => res.json());
  }

}
