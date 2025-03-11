import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { areCoprime } from "simple-substitution-ciphers";

export function coprimeValidator(getAlphabetLength: Function): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const alphabetLength: number = getAlphabetLength();
    const value = areCoprime(control.value, alphabetLength);
    return !value ? { coprime: { value: `Numbers ${control.value} and ${alphabetLength} must be coprime.` } } : null;
  };
}