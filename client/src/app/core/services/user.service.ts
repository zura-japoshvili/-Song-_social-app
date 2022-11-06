import { loginInt } from './../interfaces/loginInt';
import { userRegInt } from './../interfaces/userRegInt';
import { userDataInt } from './../interfaces/userDataInt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public postUser(data: userRegInt): Observable<userDataInt> {
    return this.http.post<userDataInt>('http://localhost:8800/api/auth/register/', data).pipe(
      catchError(() => {
        return throwError(() => {
          return new Error('Something Went Wrong');
        })
      })
    );
  }

  public getUser(data: loginInt): Observable<userDataInt> {
   return  this.http.post<userDataInt>('http://localhost:8800/api/auth/login',data);
  }

  public getUserData(userId: string): any {
    return this.http.get("http://localhost:8800/api/users?userId="+ userId);
  }

  public getAllUsers(): Observable<userDataInt []>{
    return this.http.get<userDataInt []>("http://localhost:8800/api/users/getAllUsers");
  }

  public loadUser(username: string): Observable<userDataInt> {
    return this.http.get<userDataInt>('http://localhost:8800/api/users/profile/'+ username).pipe(
      catchError(() => {
        return throwError(() => {
          return new Error('Something Went Wrong');
        })
      })
    );
  }
}
