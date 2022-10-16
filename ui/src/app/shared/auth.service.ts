import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Customer } from './customer';


export interface User extends Customer{}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | undefined;
  accessToken: string = '';
  refreshToken: string = '';
  constructor() {}

  setCurrentUser(user: User | undefined){
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

  setAccessToken(token: string): void {
    localStorage.setItem('access', token);
    this.accessToken = token;

  }

  getAccessToken(): string | null {
    if (this.accessToken){
      return this.accessToken
    }
    try{
      const token: string | null = localStorage.getItem('access') || "";
      return token;
    }
    catch(e){
      if(e instanceof SyntaxError){
        return null;
      }
    }
    return null;

  }

  signOut(): void{
    localStorage.clear();
    sessionStorage.clear();
    this.currentUser = undefined;

  }

  setRefreshToken(): void {

  }

  getRefreshToken(): void {

  }

  validateToken(): void {

  }
  

}
