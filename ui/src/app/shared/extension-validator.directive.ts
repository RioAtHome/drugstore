import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ExtensionValidator({ forbiddenExt }: { forbiddenExt: string[]; }): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
     const ext: string = control.value.split('.')[0]
     return !forbiddenExt.includes(ext) ? {badExtension: {value: control.value}}: null;
  }
}

