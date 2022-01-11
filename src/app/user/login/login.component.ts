import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtresponse } from 'src/app/shared/models/jwtresponse';
import { TblUser } from 'src/app/shared/models/user';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
loginUser:TblUser= new TblUser();
isSubmitted=false;
error = '';
jwtResponse:any = new jwtresponse;

  constructor(private formBuilder:FormBuilder,private loginservice:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        Username: ['', [Validators.required, Validators.minLength(2)]],
        Password: ['', [Validators.required]]
      }
    );
  }

  //Get controls
  get formControls() {
    return this.loginForm.controls;
  }

  //login Verify Credentials
  loginCredentials() {
    this.isSubmitted = true;
    console.log(this.loginForm.value);

    //valid or invalid
    if (this.loginForm.invalid) {
      return;
    }
    // #region valid form
    if (this.loginForm.valid) {
      //calling methods from service
      this.loginservice.loginVerify(this.loginForm.value).subscribe(
        data => { console.log(data); 
          this.jwtResponse=data;
          sessionStorage.setItem("jwtToken", this.jwtResponse.token);
          localStorage.setItem("Username", this.jwtResponse.uName);
          this.router.navigateByUrl('/home');
        },
        error => {
          this.error = "Invalid User name or Password. Try Again"
        }
      );      
  }
 
  }

  loginVerifyTest(){
    if (this.loginForm.valid) {
      this.loginservice.getUserbyCredentials(this.loginForm.value).subscribe(
        data=>{
          console.log(data);
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }

}
