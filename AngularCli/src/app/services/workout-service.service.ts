import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WorkoutServiceService {

  constructor(
    private httpThang: Http
  ) { }

  newWorkout(componentInfo) {
    return this.httpThang
    .post(`${environment.apiBase}/api/workout/new`,
      //Form body information to send to the back end (req.body)
    componentInfo,
    //send the cookies across domains
    {withCredentials : true}
  )
  //parse the json
  .map(res => res.json());
  }//close newReview

  getSpecificWorkout(id) {
    return this.httpThang
    .get(`${environment.apiBase}/api/workout/:id`,
    //Form body information to send to the back end (req.body)
    {withCredentials: true}
    )
    //parse the json
    .map(res => res.json());
  }

}
