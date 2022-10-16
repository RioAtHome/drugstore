import { AuthService } from './auth.service';
import { Customer } from './customer';
import { Order } from './order';
import { OrderedDrug } from './drug';
import { Drug } from './drug';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap} from 'rxjs/operators';
import { LogService } from './log.service';

export interface LoginData {
  pharmacy: Customer,
  access : string,
  refresh: string
} 


@Injectable({
  providedIn: 'root'
})
export class RestServiceService {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private logger: LogService, private auth: AuthService) {

  console.log(this.auth.getAccessToken()); }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  fileAuthOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getAccessToken()}`
    }),
    reportProgress: true,
   
}
  httpAuthOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getAccessToken()}`
    }),

  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 500){
      return throwError(() => new Error('Oops, something went wrong, please try again later!'));
    }
    const errMsg: string = error.error.detail;
    return throwError(() => new Error(errMsg));
  }


  signIn(code: string, password:string): Observable<LoginData>{
    return this.http.post<LoginData>(this.baseUrl + 'users/signin/',
      {code, password},
      this.httpOptions).pipe(
      tap(_ => this.logger.log('Sign in Happened')),
      catchError(this.handleError),
      );
  }

  updateProfilePicture(data: FormData): Observable<Customer>{
    const code = this.auth.getCurrentUser()?.code

    const url = this.baseUrl + `users/${code}/`;
    return this.http.patch<Customer>(url, data, this.fileAuthOptions).pipe(
      tap(_ => this.logger.log('Photo Uploaded')),
      catchError(this.handleError),
      )
  }

  updateProfileInfo(data: any):Observable<Customer> {
    const code = this.auth.getCurrentUser()?.code

    const url = this.baseUrl + `users/${code}/`;
    return this.http.patch<Customer>(url, data, this.httpAuthOptions).pipe(
      tap(_ => this.logger.log('Account Updated')),
      catchError(this.handleError),
      )

  }
}
