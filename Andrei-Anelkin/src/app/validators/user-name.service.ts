import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserNameService {

  constructor() { }

  static isNameTaken(Name: string): Observable<boolean> {
    const splittedName = Name.split(' ');
    const isValid: boolean = UserNameService.isValidName(splittedName);
    return of(isValid).pipe(delay(800));
  }
  static checkName(Name: string): boolean {
    const firstCharacter = Name.charAt(0);
    const upperCharacter = firstCharacter.toUpperCase();
    return firstCharacter === upperCharacter;
  }
  static isValidName(splittedName: Array<string>): boolean {
    if (splittedName.length <= 2) {
      for (const part of splittedName) {
        const isValidPart = UserNameService.checkName(part);
        if (!isValidPart) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
