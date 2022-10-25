import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard {
  constructor(public router: Router, public auth: AuthService) { }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()){
      this.router.navigateByUrl('signin');
      return false;
    }
    return true;
 
 }

  
}
