import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class ExcerciseServiceService {

  constructor(
    private httpThang: Http
  ) { }



  newExcercise(componentInfo) {
    return this.httpThang
    .post(`${environment.apiBase}/api/excercise/new`,
      //Form body information to send to the back end (req.body)
    componentInfo,
    //send the cookies across domains
    {withCredentials : true}
  )
  //parse the json
  .map(res => res.json());
  }//close newReview

  getSpecificExcercise(id) {
    return this.httpThang
    .get(`${environment.apiBase}/api/excercise/${id}`,
    //Form body information to send to the back end (req.body)
    {withCredentials: true}
    )
    //parse the json
    .map(res => res.json());
  }

  addExcerciseToWorkout(workoutId, excerciseId) {
      // var workoutId = {id:user._id}
      return this.httpThang
      .post(`${environment.apiBase}/api/workout/${workoutId}/addexcercise/${excerciseId}`,
        {withCredentials:true}
      )
      //parse the JSON
      .map(res => res.json());
    }


    //DELETE------------------------------------------------------------------
deleteExcercise(id){
return this.httpThang
.post(
  `${environment.apiBase}/api/excercise/${id}/delete`,
  { withCredentials: true })
  .map( res => res.json())
  }

}
