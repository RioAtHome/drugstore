import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Customer } from './customer';
import { RestServiceService } from './rest-service.service';

export interface User extends Customer{}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | undefined;

  constructor(private restClient: RestServiceService) {}

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
  }

  getCurrentUser(): User | undefined | null{
    if (this.currentUser){
      return this.currentUser
    }

    if (this.getCurrentUserStorage()){
      return this.getCurrentUserStorage();
    }

    return undefined;
  }

  getCurrentUserStorage(): User | null {
    let userJSON : string | null;
    try{
      const user: User | null = JSON.parse(localStorage.getItem('user') || "");
      return user;
    }
    // throws for some reason Illegal Constructer
    catch(e){
      if(e instanceof SyntaxError){
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser()? true: false;
  }

  isStaff(): boolean {
    return this.currentUser?.is_staff ? true : false;
  }

  validateToken(): void {

  }

  refreshToken(): void{

  }

  signOut(): void{
    localStorage.clear();
    sessionStorage.clear();

  }
}
