import { Injectable, Optional, SkipSelf } from '@angular/core';
import { User } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | undefined;
  accessToken: string = '';
  refreshToken: string = '';
  constructor(@Optional() @SkipSelf() sharedService?: AuthService) {
    if(sharedService){
      throw new Error(
          "AuthService is already loaded"
        );
    }
    console.info('AuthService have been created');
  }

  setCurrentUser(user: User | undefined){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
  }

  getCurrentUser(): User | undefined | null{
    if (this.getCurrentUserStorage()){
      return this.getCurrentUserStorage();
    }
    if (this.currentUser){
      return this.currentUser
    }

    return undefined;
  }

  getCurrentUserStorage(): User | null {
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

  isStaff(): boolean | undefined {

    return this.getCurrentUser()?.is_staff;
  }

  setAccessToken(token: string): void {
    localStorage.setItem('access', token);
    this.accessToken = token;

  }

  getAccessToken(): string | null {
    try{
      const token: string | null = localStorage.getItem('access') || "";
      return token;
    }
    catch(e){
      if(e instanceof SyntaxError){
        return null;
      }
    }
    if (this.accessToken){
      return this.accessToken
    }
    return null;

  }

  signOut(): void{
    localStorage.clear();
    sessionStorage.clear();
    this.currentUser = undefined;
    this.accessToken = '';

  }

  setRefreshToken(token:string): void {
    localStorage.setItem('refresh', token);
    this.accessToken = token;

  }

  getRefreshToken(): string | null {
    try{
      const token: string | null = localStorage.getItem('refresh') || "";
      return token;
    }
    catch(e){
      if(e instanceof SyntaxError){
        return null;
      }
    }
    if (this.accessToken){
      return this.accessToken
    }
    return null;

  }

  validateToken(): void {

  }
  
}
