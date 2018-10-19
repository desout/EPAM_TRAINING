import * as moment from 'moment';

const dateFormats = [moment.ISO_8601];
export function validateData(user: any, standardUser: any): boolean {
    const currentUserKeys: string[] = Object.keys(user);
    const userKeys: string[] = Object.keys(standardUser);
    if (currentUserKeys.length === userKeys.length) {
        const isSameKeys: boolean = checkKeys(userKeys, currentUserKeys, user);
        if (isSameKeys) {
          const isDateOfBirthValid: boolean = checkDate(user.dateOfBirth);
          const isDateOfFirstLoginValid: boolean = checkDate(user.dateOfFirstLogin);
          const isDateNextNotificationValid: boolean = checkDate(user.dateNextNotification);
          return isDateOfBirthValid && isDateOfFirstLoginValid && isDateNextNotificationValid;
        }
        return false;
    }
    return false;
}
function checkKeys(userKeys: string[], currentUserKeys: string[], user: any): boolean {
  for (const key of currentUserKeys) {
    if (!userKeys.includes(key) || !user[key]) {
      return false;
    }
  }
  return true;
}
function checkDate(dateString: string): boolean {
   const date = moment(dateString, dateFormats, true);
   return date.isValid();

}
