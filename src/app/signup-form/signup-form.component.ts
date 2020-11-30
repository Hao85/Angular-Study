import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    account : new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        UsernameValidators.cannotContainSpace
      ], UsernameValidators.shouldBeUnique),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]) 
    })
  });

  login() {
    this.form.setErrors({
      isInvalidLogin: true
    });

    // // when we have authServrvice 
    // let isValid = authService.login(this.form.value);
    // if (!isValid)
    //   this.form.setErrors({
    //     isInvalidLogin: true
    //   });
  }

  get username() {
    return this.form.get("account.username");
  }

  get password() {
    return this.form.get("account.password");
  }

}
