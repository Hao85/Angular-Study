import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AuthService: AuthService) { 
    }

    signIn(credentials) {
      this.AuthService.login(credentials)
        .subscribe(result => {
          if (result){
            let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
            this.router.navigate([returnUrl || "/"]);
          }
          else {
              this.invalidLogin = true;
          } 
        })
    }

}
