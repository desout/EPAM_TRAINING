import {Directive, forwardRef, Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';
import {UserNameService} from './user-name.service';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NameValidator implements AsyncValidator {
  constructor(private UserNameService: UserNameService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return UserNameService.isNameTaken(ctrl.value).pipe(
      map(isTaken => (!isTaken ? { suitName: true } : null)),
      catchError(() => null)
    );
  }


}

@Directive({
  selector: '[appUniqueAlterEgo]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => NameValidator),
      multi: true
    }
  ]
})
export class UserNameDirective {
  constructor(private validator: NameValidator) {
  }

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
