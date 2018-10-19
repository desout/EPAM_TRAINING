import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserNameService {

  constructor() { }

  static isNameTaken(name: string): Observable<boolean> {
    const splittedName = name.split(' ');
    const isValid: boolean = UserNameService.isValidName(splittedName);
    return of(isValid).pipe(delay(800));
  }
  static checkName(name: string): boolean {
    const splittedName: string[] = name.split('');
    for (const char of splittedName ) {
        if (!this.isLetter(char)) {
          return false;
        }
    }
    const firstCharacter = name.charAt(0);
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
  static isLetter(c) {
    return c.toLowerCase() !== c.toUpperCase();
  }
}
