import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AuthServiceService]
})
export class HomeComponent implements OnInit {
  loginInfo = {
  email: '',
  password: ''
};

signUpInfo = {
    fullName: '',
    email: '',
    password: '',
    picture: '',
    weight: undefined,
    height: undefined
  };

baseUrl = environment.apiBase;
currentUser: any = {};
loginErrorMessage: string;
saveError: string;
errorMessage: string;
signUpErrorMessage: string;
loginVisible:boolean = false;
signUpVisible:boolean = false;

  constructor(
    private routerThang: Router,
    private route: ActivatedRoute,
    private authThang: AuthServiceService
  ) { }

  ngOnInit() {
  }

  showSignUp() {
  this.signUpVisible = true;
}

  hideSignUp() {
    this.signUpVisible = false;
  }

  showLogin() {
    this.loginVisible = true;
  }

  hideLogin() {
    this.loginVisible = false;
  }

  doLogin() {
    this.authThang.login(this.loginInfo)
    .then((resultFromApi) => {
      //clear the Forms
      this.loginInfo = {
      email: '',
      password: ''
    };
    //clear error message
    this.loginErrorMessage = "";
    this.routerThang.navigate(['/profile'])
    })
    .catch((err) => {
      const parsedError = err.json();
      this.loginErrorMessage = parsedError.message + ' 😤';
    })
  } //close doLogin()


  doSignup() {
    this.authThang.signUp(this.signUpInfo)
    .then((resultFromApi)=> {
      this.signUpInfo = {
        fullName: '',
        email: '',
        password: '',
        picture: '',
        weight: undefined,
        height: undefined
      };
      this.signUpErrorMessage = "";
      this.routerThang.navigate(['/profile'])
    })
    .catch((err) => {
      const parsedError = err.json();
      this.loginErrorMessage = parsedError.message + ' 😤';
    })
  } //close doSignup()

}
