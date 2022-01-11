import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { UserlistService } from 'src/app/shared/services/userlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userlistservice:UserlistService,private loginservice:LoginService,private route:Router) { }

  ngOnInit(): void {
    this.userlistservice.bindUserList();
  }
logout(){
this.loginservice.logout();
this.route.navigateByUrl('');
}
}
