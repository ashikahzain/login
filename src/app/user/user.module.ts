import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [ LoginComponent, HomeComponent, UserFormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService]
})
export class UserModule { }
