import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ExtensionValidator(AllowedExt: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      console.log('Value of control is -->', control.value);
     let ext: string = control.value.split('.')[1]
     console.log('value of ext is --> ', ext);
     if(AllowedExt.includes(ext)){
      return {forbiddenExt: true}
     }
     return null;
  }
}

