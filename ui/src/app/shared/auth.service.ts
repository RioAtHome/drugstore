import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Customer } from '../admin-view-customers/admin-view-customers.component';
import { RestServiceService } from './rest-service.service';

export interface User extends Customer{}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private restClient: RestServiceService) { }


  isAuthenticated(): boolean {
    return false;
  }

  refreshToken(): void{

  }
}
