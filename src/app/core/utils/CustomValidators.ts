import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators{
    static EmailValidator(email: string): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {
          const emailCtrl: string = control.get(email).value;
    
          if (emailCtrl.match("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")) {
            return {emailValidate: false};
          }
          return null;
        }
      }
}