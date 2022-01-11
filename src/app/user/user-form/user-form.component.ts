import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TblUser } from 'src/app/shared/models/user';
import { UserlistService } from 'src/app/shared/services/userlist.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  UserId:number;
  User = new TblUser();

  constructor(public userservice:UserlistService,private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.userservice.formData.UserId;
    //insert
    if (addId == 0 || addId == null) {
      this.insertUserRecord(form);
    }
  }

  insertUserRecord(form:NgForm){
    console.log("Inserting a record...");
    console.log(form.value);
    this.userservice.insertUser(form.value).subscribe(
      (result) => {
        console.log(result);
      this.route.navigateByUrl('/home');
      }
    );
   // window.location.reload();
  }



}
