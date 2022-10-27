import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-navbar-notification',
  templateUrl: './navbar-notification.component.html',
  styleUrls: ['./navbar-notification.component.css']
})
export class NavbarNotificationComponent implements OnInit {

  constructor(private ws: WebSocketService) { }

  ngOnInit(): void {
  }

}
