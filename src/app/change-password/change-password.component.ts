import { PasswordValidators } from './password.validators';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  form = new FormGroup({
    oldPassword: new FormControl(
      "", 
      Validators.required,
      PasswordValidators.invalidOldPassword
    ),
    newPassword: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required)
    }, PasswordValidators.passwordsShouldMatch);

  get oldPassword() {
    return this.form.get("oldPassword");
  }

  get newPassword() {
    return this.form.get("newPassword");
  }

  get confirmPassword() {
    return this.form.get("confirmPassword");
  }

}
