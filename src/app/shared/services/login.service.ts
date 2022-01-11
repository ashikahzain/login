import { Injectable } from '@angular/core';
import { TblUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
formData:TblUser= new TblUser()
  constructor(private httpClient:HttpClient) {}

getUserbyCredentials(user:TblUser){
  console.log(user.Username);
  return this.httpClient.get(environment.apiUrl+'/api/login/getuser/'+user.Username+'/'+user.Password);
}
loginVerify(user:TblUser){
  console.log("Attempt authorization");
console.log(user);
  return this.httpClient.get(environment.apiUrl+'/api/login/'+user.Username+'/'+user.Password)
}

public logout(){
  localStorage.removeItem('Username');
  sessionStorage.removeItem('Username');
  sessionStorage.removeItem('token');
}
}
