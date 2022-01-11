import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"userform",component:UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
