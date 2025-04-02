import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isPrime } from '@sr9yar/public-key-cryptography';

export function primeValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const value = isPrime(control.value);
    return !value ? { prime: { value: `Number must be prime.` } } : null;
  };
}