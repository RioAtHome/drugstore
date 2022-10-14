import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceService {

  constructor(public router: Router, public auth: AuthService) { }

  canActivate(): boolean {
    if (!this.auth.isStaff()){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
