import { AuthService } from './auth.service';
import { Injectable, SkipSelf, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { LogService } from './log.service';
import { Customer, Order, LoginData, ListCustomerOrders, ListCustomers, Drug } from 'src/app/shared/models';



@Injectable({
  providedIn: 'root'
})
export class RestService {

  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private logger: LogService, private auth: AuthService, @Optional() @SkipSelf() sharedService?: RestService) {
    if (sharedService){
      throw new Error("RestService have already been created")
    }
    console.info("RestService have been created!")
   }

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

  fileDonwload = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getAccessToken()}`
    }),
    responseType: 'blob'
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

  getAllDrugs(pag: boolean, page:string='1'): Observable<Drug[]> {
    const url = this.baseUrl + `drugs?page=${page}`;
    if(pag){
      const url = this.baseUrl + `drugs/?no_pag=true`;
    }

    return this.http.get<Drug[]>(url, this.httpAuthOptions).pipe(
      tap(_ => this.logger.log('Getting All Drugs')),
      catchError(this.handleError),
      )
  }

  importDrugs(){

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

    return this.http.post<any>(url, data, this.fileAuthOptions).pipe(
      tap(_ => this.logger.log('importing New Customers')),
      catchError(this.handleError)
      )
    }

    getAllOrders(query_params: string[]| any): Observable<ListCustomerOrders>{

      let url = this.baseUrl + `orders/all`
      

      return this.http.get<ListCustomerOrders>(url, {...this.fileAuthOptions, params: new HttpParams({fromObject: query_params})}).pipe(
      tap(_ => this.logger.log('Getting All Orders')),
      catchError(this.handleError)
      )
    }

    ExtractOrders(query_params: string[]| any): Observable<Blob>{

      let url = this.baseUrl + `orders/all/extract/`
      

      return this.http.get(url, {...this.fileAuthOptions, params: new HttpParams({fromObject: query_params}), responseType: 'blob'}).pipe(
      catchError(this.handleError)
      )
    }
  
    changeStatus(id: number | undefined, status: string="CO"): Observable<any>{
      const url = this.baseUrl + `orders/${id}/set-status/`;
      return this.http.patch<any>(url,{status: status}, this.httpAuthOptions).pipe(
      tap(_ => this.logger.log('Changed Status')),
      catchError(this.handleError)
      )
    }
    
    changeBatchStatus(orders: Order[] ): Observable<any>{
      const url = this.baseUrl + `orders/set-status/batch`;
      return this.http.patch<any>(url, orders, this.httpAuthOptions).pipe(
      tap(_ => this.logger.log('Changed Status')),
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
