import * as moment from 'moment';
import {DATE_FORMATS} from '../shared/Configuration';

export class User {
  id: number;
  name: string;
  password: string;
  dateOfBirth: string;
  dateOfFirstLogin: string;
  dateNextNotification: string;
  information: string;

  constructor(name: string,
              password: string,
              dateOfBirth: string,
              dateOfFirstLogin: string,
              dateNextNotification: string,
              information: string) {
    this.name = name;
    this.password = password;
    this.dateOfBirth = User.convertDate(dateOfBirth);
    this.dateOfFirstLogin = User.convertDate(dateOfFirstLogin);
    this.dateNextNotification = User.convertDate(dateNextNotification);
    this.information = information;
  }
  private static convertDate(date: string): string {
    return moment(date, DATE_FORMATS, true).toISOString();
  }

}
