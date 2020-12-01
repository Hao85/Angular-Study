import { AbstractControl, ValidationErrors } from '@angular/forms';
export class PasswordValidators {
    static invalidOldPassword(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise ((resovle, reject) => {
            setTimeout(() => {
                if (control.value !=="1234")
                    resovle({invalidOldPassword: true});
                else 
                    resovle(null);
            }, 2000);
        });
    }

    static passwordsShouldMatch(control: AbstractControl): ValidationErrors | null {
        let newPassword = control.get("newPassword");
        let confirmPassword = control.get("confirmPassword");
        if (confirmPassword.value !== newPassword.value)
            return { passwordsShouldMatch: true };

        return null;
    } 
}