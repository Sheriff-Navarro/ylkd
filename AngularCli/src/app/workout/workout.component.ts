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
           this.getThemProfile();
           this.getWorkoutDetails(params['id']);
          })
        })
     .catch(() => {
         this.routerThang.navigate(['/']);
     });
     this.getParams();
     // this.checkSavedRecipes();
 } //

 hideExcercises(){
   this.excercisesVisible = false;
 }

 showExcercises() {
   this.excercisesVisible = true;
 }

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

  getThemProfile() {
    this.profileThang.getProfile()
    .subscribe(
      (data) => { this.data = data;
        console.log("This data: ", this.data) },
        () => {
          this.retrieveProfileError = 'Sorry, could not retrieve all the recipes'
        }
      );
    }//close getThemRecipes.

    addExcercise(workoutId, excerciseId){
      //send both the :excerciseId and the :workoutId
    console.log("Workout Id   ", workoutId);
    console.log("excercise Id   ", excerciseId);
    this.excerciseThang.addExcerciseToWorkout(workoutId, excerciseId)
    // .subscribe()
    .subscribe((workout) =>{
    console.log('RES = ', workout);
    this.workout = workout;
      })
    }

    deleteWorkout() {
        this.workoutThang.deleteWorkout(this.workout._id)
          .subscribe(() => {
            this.routerThang.navigate(['/profile']);
          });
    }


}
