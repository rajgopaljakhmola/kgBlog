import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  loginForm:FormGroup
  constructor() {
    this.loginForm = new FormGroup({
      userName : new FormControl(''),
      password : new FormControl('') 
    })
   }
  @Output() logEventEmitter = new EventEmitter<any>()
  
  ngOnInit(): void {
  }
  login(form:any) {
    const {userName, password} = form.value
    if (userName === 'admin' && password === 'admin') {
      this.isLoggedIn = true
      this.logEventEmitter.emit(this.isLoggedIn)
    }
  }

}
