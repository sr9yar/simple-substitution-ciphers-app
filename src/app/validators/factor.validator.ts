import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { getAllFactors } from '@sr9yar/public-key-cryptography';


export function factorValidator(
  getP: Function,
  getCustomMessage?: Function,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const p = getP();
    const factors: number[] = getAllFactors(p - 1);
    let validationMessage = `Number must be a factor of p-1 (${p - 1}): ${factors.join(', ')}.`;
    if (typeof getCustomMessage == 'function') {
      validationMessage = getCustomMessage(control.value, factors);
    }
    const value = factors.includes(control.value);
    return !value ? { factor: { value: validationMessage } } : null;
  };
}
