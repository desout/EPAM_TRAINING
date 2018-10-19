import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from './models/User';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private rootUrl = 'http:///localhost:8000/users';
  constructor(private http: HttpClient) {

  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.rootUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }
  getUser(id: number): Observable<User> {
    const url = `${this.rootUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(
      catchError(this.handleError<User>(`getUser, id=${id}`))
    );

  }
  addUser(user: User): Observable<User> {
    const url = `${this.rootUrl}/add`;
    return this.http.post<User>(url, user, httpOptions).pipe(
      catchError(this.handleError<User>(`addUser,user=${user}`))
    );
  }
  updateUser (user: User): Observable<User> {
    const url = `${this.rootUrl}/${user.id}`;
    return this.http.put(url, user, httpOptions).pipe(
      catchError(this.handleError<any>(`updateUser,user=${user}`))
    );
  }
  deleteUser (id: number): Observable<User> {
    const url = `${this.rootUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      catchError(this.handleError<User>(`deleteUser,id=${id}`))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`operation: ${operation} \n error: ${error}`);
      return of(result as T);
    };
  }
}
