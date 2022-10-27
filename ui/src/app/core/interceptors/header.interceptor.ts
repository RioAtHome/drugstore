import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

const PUBLIC_ENDPOINTS: string[] = [
"http://localhost:8000/api/users/signin/"
]

const FILES_ENDPOINTS: string[] = [

]

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(PUBLIC_ENDPOINTS.includes(request.url)){
      const newRequest = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
      return next.handle(newRequest); 
    }
    const newRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.auth.getAccessToken()}`
        }
      });
    return next.handle(newRequest);
  }
}


