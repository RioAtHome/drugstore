import { AuthService } from './auth.service';
import { Customer } from './customer';
import { Order } from './order';
import { OrderedDrug } from './drug';
import { Drug } from './drug';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { ObjectUnsubscribedError, Observable, throwError } from 'rxjs';
import { retry, catchError, tap, retryWhen} from 'rxjs/operators';
import { LogService } from './log.service';

export interface LoginData {
  pharmacy?: Customer,
  access? : string,
  refresh?: string
} 


export interface ListCustomerOrders {
  count: number,
  next: string,
  previous?: string
  results: Order[]
}

export interface ListCustomers extends Omit<ListCustomerOrders, 'results'> {
  results: Customer[]
}


@Injectable({
  providedIn: 'root'
})
export class RestServiceService {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private logger: LogService, private auth: AuthService) { }
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


  signIn(code: string, password: string): Observable<LoginData>{
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

  getAllDrugs(): Observable<Drug[]> {
    const url = this.baseUrl + `drugs/?no_pag=true`;
    return this.http.get<Drug[]>(url, this.httpAuthOptions).pipe(
      tap(_ => this.logger.log('Getting All Drugs')),
      catchError(this.handleError),
      )
  }

  createNewOrder(order: Order): Observable<Order> {
    const code = this.auth.getCurrentUser()?.code;
    const url = this.baseUrl + `orders/${code}/`;

    return this.http.post<Order>(url, order, this.httpAuthOptions).pipe(
        tap(_ => this.logger.log("Created a New Drug!")),
        catchError(this.handleError)
      );
  }

  getCustomerOrders(query_status: string, page_number: string='1'): Observable<ListCustomerOrders>{
    const code = this.auth.getCurrentUser()?.code;
      let url = this.baseUrl + `orders/${code}/?status=${query_status}&page=${page_number}`;

    if(query_status === 'archived'){
      url = this.baseUrl + `orders/${code}/?status=CA&status=CO&status=RE&page=${page_number}`
    }

    return this.http.get<ListCustomerOrders>(url, this.httpAuthOptions).pipe(
      tap(_ => this.logger.log("Getting List of Drugs")),
      catchError(this.handleError)
      )
  }

  editOrder(order: Order, id: number | undefined, code: string | undefined): Observable<any>{
    const url = this.baseUrl + `orders/${code}/${id}/`;

    return this.http.put<any>(url, order,this.httpAuthOptions).pipe(
      tap(_ => this.logger.log(`updating Order`)),
      catchError(this.handleError)
      )
  }

  getAllCustomer(page_number: string='1'): Observable<ListCustomers>{
    const url = this.baseUrl + `users/?page=${page_number}`;

    return this.http.get<ListCustomers>(url, this.httpAuthOptions).pipe(
      tap(_ => this.logger.log('Getting All Customers')),
      catchError(this.handleError)
      )
  }

  importCustomers(data: FormData): Observable<any>{
    const url = this.baseUrl + 'users/';

    return this.http.post<any>(url, this.fileAuthOptions, {reportProgress: true, observe: 'events'}).pipe(
      tap(_ => this.logger.log('importing New Customers')),
      catchError(this.handleError)
      )
    }
  

  // TODO: Enable refresh token, like for real
  refreshToken(token: string): Observable<LoginData>{
    const url = this.baseUrl + 'users/refresh/';

    return this.http.post<LoginData>(url, {refresh: token}, this.httpAuthOptions).pipe(
      tap(_ => this.logger.log("refresh Token")),
      catchError(this.handleError),
      )

  } 
}
