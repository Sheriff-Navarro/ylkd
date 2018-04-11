import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ProfileServiceService } from '../services/profile-service.service';
import { environment } from '../../environments/environment';
import {ExcerciseServiceService } from '../services/excercise-service.service';
import {WorkoutServiceService} from '../services/workout-service.service'

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
  providers: [AuthServiceService, ProfileServiceService, ExcerciseServiceService, WorkoutServiceService]
})
export class WorkoutComponent implements OnInit {
  baseUrl = environment.apiBase;
  currentUser: any = {};
  paramsId = undefined;
  data: any = {};
  retrieveProfileError: string;
  workoutsVisible  = false;
  excercisesVisible = false;

  workout: any = {};

  excerciseInfo = {
    excerciseName: "",
    excerciseWeight: undefined,
    excerciseReps: undefined,
    excercisePrivacy: undefined,
    urlLink: ""
  }


  workoutInfo = {
    workoutName: "",
    workoutDuration: undefined
  }

  excerciseSaveError: string;
  workoutSaveError: string;


  constructor(
    private routerThang: Router,
    private route: ActivatedRoute,
    private authThang: AuthServiceService,
    private profileThang: ProfileServiceService,
    private excerciseThang: ExcerciseServiceService,
    private workoutThang: WorkoutServiceService
  ) { }

  ngOnInit() {
   this.authThang.checklogin()
     .then((userFromApi) => {
         this.currentUser = userFromApi;
         console.log(this.currentUser);
         this.route.params.subscribe(params => {
           this.getWorkoutDetails(params['id']);
         })
         })
     .catch(() => {
         this.routerThang.navigate(['/']);

     });

     this.getParams();
     // this.checkSavedRecipes();
 } //

  getParams() {
  this.route.params.subscribe(params=> {
    this.paramsId = params['id'];
    console.log("Params Id ", this.paramsId)
  })
}

getWorkoutDetails(id) {
    this.workoutThang.getSpecificWorkout(id)
    .subscribe((workout) =>{
      console.log('RES = ', workout);
      this.workout = workout;
    })
  }

}
