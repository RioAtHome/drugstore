import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard {
  constructor(public router: Router, public auth: AuthService) { }
  canActivate(): boolean {
    if (!this.auth.isStaff()){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
