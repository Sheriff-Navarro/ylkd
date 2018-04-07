import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ProfileServiceService } from '../services/profile-service.service';
import { environment } from '../../environments/environment';
import {ExcerciseServiceService } from '../services/excercise-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[AuthServiceService, ProfileServiceService, ExcerciseServiceService]

})
export class ProfileComponent implements OnInit {
  baseUrl = environment.apiBase;
  currentUser: any = {};
  paramsId = undefined;
  data: any = {};
  retrieveProfileError: string;

  constructor(
    private routerThang: Router,
    private route: ActivatedRoute,
    private authThang: AuthServiceService,
    private profileThang: ProfileServiceService,
    private excerciseThang: ExcerciseServiceService
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



}
