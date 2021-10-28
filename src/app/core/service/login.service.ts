import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginData = true;
  userList = []
  userNameList = [] 
  validUser = localStorage.getItem('login') == 'true'|| false
loggedInUserDetails :any;
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data);
      this.userList = data
      this.userNameList = data.map((e: any) => e.username);
      localStorage.setItem('userNameList', JSON.stringify(this.userNameList))
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/user.json");
  }

  isValidUser(email: string, password: string ) {
    this.userList.forEach((e: any) => { if (e.userid == email && e.password==password) { this.loggedInUserDetails = e ; this.validUser = true } });
    if (this.validUser) {
      localStorage.setItem('login', 'true')
      localStorage.setItem('user', JSON.stringify(this.loggedInUserDetails)) 
    }
    return this.validUser;
  }
  isUserLogedIn() {

    return localStorage.getItem('login') == 'true' || this.validUser
  }

  logOut(){
    localStorage.removeItem('login');
    localStorage.removeItem('user');

    this.validUser = false
  }
  getUserNameList(){
    return this.userNameList
  }
}
