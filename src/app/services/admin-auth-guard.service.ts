import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) { 

  }

  canActivate() {
    let user =  this.AuthService.currentUser;
    if ( user && user.admin ) 
      return true;

    this.router.navigate(["/no-access"]);
    return false;
  }
}
