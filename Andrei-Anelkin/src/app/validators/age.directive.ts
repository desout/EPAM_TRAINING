import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

export const AgeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const age: number = Number(control.value);
  if (!isNaN(age)) {
    return age < 18 || age > 65 ? {'ageValue': {value: control.value}} : null;
  }
  return {'ageType': {value: control.value}};
};
@Directive({
  selector: '[appAge]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AgeDirective, multi: true }]
})
export class AgeDirective implements Validator {

  constructor() { }

  registerOnValidatorChange(fn: () => void): void {}

  validate(control: AbstractControl): ValidationErrors | null {
    return AgeValidator(control);
  }

}
