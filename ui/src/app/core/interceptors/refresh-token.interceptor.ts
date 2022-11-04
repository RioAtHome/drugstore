import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, retry, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RestService } from '../services/rest.service';

const IGNORE_ENDPOINTS: string[] = [
"http://localhost:8000/api/users/signin/"
]

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private restClient: RestService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => {
        
        if(!IGNORE_ENDPOINTS.includes(error.url as string) && error.status === 401){
          return this.refreshToken(request, next);
        }
        return next.handle(request)
    }), retry(3))
  }

  refreshToken(request: HttpRequest<any>, next: HttpHandler){
    const REFRESH_TOKEN = this.auth.getRefreshToken();

    if(REFRESH_TOKEN){
      return this.restClient.refreshToken(REFRESH_TOKEN).pipe(
        switchMap((token: any) => {
          this.auth.setAccessToken(token["access"]);
          const newRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.auth.getAccessToken()}`
        }})
          return next.handle(newRequest)
        }),retry(1),
        catchError(_=> {return throwError(()=> _)})
        )
    }
    return next.handle(request)

  }

  
}
