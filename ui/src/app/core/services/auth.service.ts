import { Injectable, Optional, SkipSelf } from '@angular/core';
import { User } from 'src/app/shared/models';

const ACCESS_TOKEN_KEY = 'access';
const REFRESH_TOKEN_KEY = 'refresh';
const USER_KEY = 'user'

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

  signOut(): void{
    localStorage.clear();
    window.sessionStorage.clear()
  }

  setCurrentUser(user: User | undefined){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
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
      const user: User | null = JSON.parse(localStorage.getItem(USER_KEY) || "");
      return user;
    }
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
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    this.accessToken = token;

  }

  getAccessToken(): string | null {
    try{
      const token: string | null = localStorage.getItem(ACCESS_TOKEN_KEY) || "";
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


  setRefreshToken(token:string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    this.accessToken = token;

  }

  getRefreshToken(): string | null {
    try{
      const token: string | null = localStorage.getItem(REFRESH_TOKEN_KEY) || "";
      return token;
    }
    catch(e){
      if(e instanceof SyntaxError){
        return null;
      }
    }
    if (this.refreshToken){
      return this.refreshToken
    }
    return null;

  }
}
