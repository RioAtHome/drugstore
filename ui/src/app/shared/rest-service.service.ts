import { AuthService } from './auth.service';
import { Customer } from './customer';
import { Order } from './order';
import { OrderedDrug } from './drug';
import { Drug } from './drug';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap} from 'rxjs/operators';
import { LogService } from './log.service';


@Injectable({
  providedIn: 'root'
})
export class RestServiceService {
  private baseUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient, private logger: LogService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Ooops, something went wrong; please try again later.'));
  }


  public signIn(code: string, password:string): Observable<Customer>{
    return this.http.post<Customer>(this.baseUrl + 'users/signin/',
      {code, password},
      this.httpOptions).pipe(
      tap(_ => this.logger.log('Sign in Happened')),
      catchError(this.handleError),
      );
  }
}
