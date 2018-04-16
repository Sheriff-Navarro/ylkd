import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ProfileServiceService } from '../services/profile-service.service';
import { environment } from '../../environments/environment';
import {ExcerciseServiceService } from '../services/excercise-service.service';
import {WorkoutServiceService} from '../services/workout-service.service'

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.component.html',
  styleUrls: ['./excercise.component.css'],
  providers:[AuthServiceService, ProfileServiceService, ExcerciseServiceService, WorkoutServiceService]
})
export class ExcerciseComponent implements OnInit {
  baseUrl = environment.apiBase;
  currentUser: any = {};
  paramsId = undefined;
  data: any = {};
  retrieveProfileError: string;
  workoutsVisible  = false;
  excercisesVisible = false;
  workout: any = {};
  excercise: any = {};

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
           this.getExcerciseDetails(params['id']);
           this.getThemProfile();
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
    })
 }

 getExcerciseDetails(id) {
     this.excerciseThang.getSpecificExcercise(id)
     .subscribe((excercise) =>{
       this.excercise = excercise;
       console.log("This Excercise: ", this.excercise)
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
  .subscribe((excercise) =>{
    console.log('RES = ', excercise);
    this.excercise = excercise;
  })
}

}
