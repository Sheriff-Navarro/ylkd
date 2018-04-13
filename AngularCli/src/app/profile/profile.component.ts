import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ProfileServiceService } from '../services/profile-service.service';
import { environment } from '../../environments/environment';
import {ExcerciseServiceService } from '../services/excercise-service.service';
import {WorkoutServiceService} from '../services/workout-service.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[AuthServiceService, ProfileServiceService, ExcerciseServiceService, WorkoutServiceService]

})
export class ProfileComponent implements OnInit {
  baseUrl = environment.apiBase;
  currentUser: any = {};
  paramsId = undefined;
  data: any = {};
  retrieveProfileError: string;
  workoutsVisible:boolean  = false;
  excercisesVisible:boolean = false;

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
              // this.getThemProfile(params['id']);
              this.getThemProfile();
            })
          })
        .catch(() => {
            // this.routerThang.navigate(['/profile']);
        });
        // this.getParams();
        // this.getData();
        // this.countRecipes();
    }

    showWorkouts() {
      this.workoutsVisible = true;
    }

    showExcercises() {
      this.excercisesVisible = true;
    }

    hideWorkouts() {
      this.workoutsVisible = false;
    }

    hideExcercises(){
      this.excercisesVisible = false;
    }

    getParams() {
      this.route.params.subscribe(params=> {
        this.paramsId = params['id'];
        console.log("Params Id ", this.paramsId)
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

saveNewExcercise(){
  this.excerciseThang.newExcercise(this.excerciseInfo)
  .subscribe(
    (newExcerciseFromApi) => {
      //this.data.excercise.psh(newExcerciseFromApi);
      this.excerciseInfo = {
      excerciseName: "",
      excerciseWeight: undefined,
      excerciseReps: undefined,
      excercisePrivacy: undefined,
      urlLink: ""
    };//close this.excerciseInfo
    this.excerciseSaveError = 'There was an error saving the new excercise.';
    }//close newExcerciseFromApi
  );//close subscribe
}//close saveNewExcercise();


saveNewWorkout() {
  this.workoutThang.newWorkout(this.workoutInfo)
  .subscribe(
    (newWorkoutFromApi) => {
      this.workoutInfo = {
        workoutName: "",
        workoutDuration: undefined
      }//close this.workoutInfo
      this.workoutSaveError = "There was an error saving the new workout.";
    }//close newWorkoutFromApi
  );//close subscribe
}//close saveNewWorkout

}
