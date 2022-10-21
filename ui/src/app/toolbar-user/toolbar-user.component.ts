import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.css']
})

export class ToolbarUserComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {

  }

  signOut(): void{
    this.auth.signOut();
    this.router.navigateByUrl('/');
  }

  redirect(route: string): void {
    this.router.navigateByUrl(route);
  }

  isStaff(): boolean | undefined{
    return this.auth.isStaff();
  }

}
