import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TblUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {
formData: TblUser = new TblUser();
  user : TblUser[]
  constructor(private httpClient:HttpClient) { }

  bindUserList(){
  this.httpClient.get(environment.apiUrl + '/api/login')
    .toPromise().then(
      response => this.user = response as TblUser[])
  }

  insertUser(user: TblUser): Observable<any> {
    console.log("Insertion in service");
    return this.httpClient.post(environment.apiUrl + "/api/login", user);
  }
}
