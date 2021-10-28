import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/service/login.service';
declare const $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userData: any;
  constructor(public loginService: LoginService, public router: Router) {
   
  }

  ngOnInit() {
  }


  loginModal() {

  }
  ngDoCheck() {

  }
  logOut() {
    this.loginService.logOut()
    this.router.navigate(['/home']);
  }
  closeLoginPopUp() {
    $('#myModal').modal('hide');
  }

  loginForm(value: any) {
    if (!this.loginService.isValidUser(value.email, value.password)) {
      alert('Invalid credetials')
    } else {
      this.closeLoginPopUp();
      this.router.navigate(['/home']);
      this.checkIsUserLogin()
    }
  }
checkIsUserLogin(){
  if (this.loginService.isUserLogedIn()) {
    const val = localStorage.getItem('user')
    this.userData = val ? JSON.parse(val) : null

  }
}
}
