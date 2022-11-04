import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-user-menu',
  templateUrl: './navbar-user-menu.component.html',
  styleUrls: ['./navbar-user-menu.component.css']
})
export class NavbarUserMenuComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    console.log("NavBar Notification have been created")
  }

  signOut(): void{
    this.auth.signOut();
    this.router.navigateByUrl('');
    window.location.reload()
  }

  redirect(route: string): void {
    this.router.navigateByUrl(route);
  }

  isStaff(): boolean | undefined{
    return this.auth.isStaff();
  }

}
