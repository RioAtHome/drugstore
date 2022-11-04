import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {
  @Input() authenticated: boolean = false;
  @Input() isStaff: boolean = false;
  constructor() { }

  ngOnInit(): void {
    console.log("NavBar user have been created")
  }

}
