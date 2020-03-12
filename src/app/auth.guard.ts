import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationServiceService } from 'app/authentication-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public AuthenticationService: AuthenticationServiceService, private rooter: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    /* console.log(this.AuthenticationService.loggedIn()) */
    if (this.AuthenticationService.loggedIn()) {
      return true
    }
    else {
      this.rooter.navigate(['/login']);
      return false
    }
    
  }
}

