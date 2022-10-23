import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ExtensionValidator(AllowedExt: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
     if (!control.value){
      return {forbiddenExt: true};
     }
     
     let ext: string = control.value.split('.')[1]
     if(AllowedExt.includes(ext)){
      return null
     }
     return {forbiddenExt: true};
  }
}

