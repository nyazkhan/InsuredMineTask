import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  @Output() loginFormValue = new EventEmitter<string>();
  constructor(private loginService: LoginService, ) {

    this.myForm = new FormGroup({
      email: new FormControl('abc@media.com', [Validators.required, Validators.email]),
      password: new FormControl('abc123', [Validators.required])
    });
  }

  ngOnInit() {
  }
  submit(value: any) {
    this.loginFormValue.emit(value)
   
  }
}
