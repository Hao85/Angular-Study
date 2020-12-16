import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;
  
  constructor(
    private router: Router,
    private AuthService: AuthService) { 
    }

    signIn(credentials) {
      this.AuthService.login(credentials)
        .subscribe(result => {
          if (result)
            this.router.navigate(["/"]);
          else 
            this.invalidLogin = true;
        })
    }

}
