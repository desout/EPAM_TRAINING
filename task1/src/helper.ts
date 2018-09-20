import * as moment from "moment";
const dateFormats = [moment.ISO_8601];
export function validateData(user: any, standardUser: any): boolean {
    let currentUserKeys = Object.keys(user);
    let userKeys = Object.keys(standardUser);
    if (currentUserKeys.length == userKeys.length) {
        for (let i = 0; i < currentUserKeys.length; i++) {
            if (!userKeys.includes(currentUserKeys[i]) || !user[currentUserKeys[i]]) {
                return false;

            }
        }
        let dateOfBirth = moment(user.dateOfBirth, dateFormats, true);
        let dateOfFirstLogin = moment(user.dateOfFirstLogin, dateFormats, true);
        let dateNextNotification = moment(user.dateNextNotification, dateFormats, true);
        if (dateOfBirth.isValid() && dateNextNotification.isValid() && dateOfFirstLogin.isValid()) {
            return true;
        }
        return false;
    } else return false;
}