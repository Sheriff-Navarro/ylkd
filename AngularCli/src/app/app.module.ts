import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AuthServiceService } from './services/auth-service.service';
import { ProfileComponent } from './profile/profile.component';
import { WorkoutComponent } from './workout/workout.component';
import { ExcerciseComponent } from './excercise/excercise.component';
//services
import { ProfileServiceService } from './services/profile-service.service';
import { ExcerciseServiceService } from './services/excercise-service.service';
import { WorkoutServiceService } from './services/workout-service.service';
//pipes
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    WorkoutComponent,
    ExcerciseComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FileUploadModule,
    FormsModule,
    RouterModule.forRoot(routes),

  ],
  providers: [
    AuthServiceService,
    ProfileServiceService,
    ExcerciseServiceService,
    WorkoutServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
