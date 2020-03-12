import { Component } from '@angular/core';
import { AuthenticationServiceService } from 'app/authentication-service.service';

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent{
  model = {
    username : '',
    password : '',
  }
  constructor(private authenticationServiceService: AuthenticationServiceService){}

  login(){
    this.authenticationServiceService.login(this.model.username,this.model.password)
  }

}
