import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';
  isLoggedIn:boolean= true
  constructor() {

  }

  onLogin(logInfo:boolean){
    this.isLoggedIn = logInfo
  }
}
