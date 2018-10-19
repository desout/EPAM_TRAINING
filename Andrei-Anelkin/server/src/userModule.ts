import * as helper from './helper';

const users = require('../assets/users.json');
export function getUser(id: number): any {
  if (users[id]) {
    return users[id];
  }
  return null;
}
export function getUsers(): object[] {
  return users;
}
export function updateUser(user: object, id: number): any {
  if (users[id] && helper.validateData(user, users[0])) {
    users[id] = user;
    return user;
  }
  return null;
}
export function addUser(user: any): any {
  user['id'] = users.length;
  if (helper.validateData(user, users[0])) {
    users.push(user);
    return user;
  }
    return null;
}
export function deleteUser(id: number): any {
  if (id && users[id] && users.length > 1 ) {
    return users.splice(id, 1);
  }
  return null;
}
