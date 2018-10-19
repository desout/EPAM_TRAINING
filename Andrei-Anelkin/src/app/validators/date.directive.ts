import {Directive} from '@angular/core';
import {AbstractControl, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';
import {DATE_FORMATS} from '../shared/Configuration';

export const DateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const date: string = control.value;
  const result: boolean = moment(date, DATE_FORMATS, true).isValid();
  return !result ? {'dateValue': {value: control.value}} : null;
};
@Directive({
  selector: '[appDate]'
})
export class DateDirective implements Validator {

  constructor() {}

  registerOnValidatorChange(fn: () => void): void {}

  validate(control: AbstractControl): ValidationErrors | null {
    return DateValidator(control);
  }

}
