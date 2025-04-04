import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { areCoprime } from 'simple-substitution-ciphers';

export function coprimeValidator(getAlphabetLength: Function, getCustomMessage?: Function): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const alphabetLength: number = getAlphabetLength();
    let validationMessage = `Numbers ${control.value} and ${alphabetLength} must be coprime.`;
    if (typeof getCustomMessage == 'function') {
      validationMessage = getCustomMessage(control.value, alphabetLength);
    }
    const value = areCoprime(control.value, alphabetLength);
    return !value ? { coprime: { value: validationMessage } } : null;
  };
}