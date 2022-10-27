import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-navbar-notification',
  templateUrl: './navbar-notification.component.html',
  styleUrls: ['./navbar-notification.component.css']
})
export class NavbarNotificationComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  constructor(private ws: WebSocketService) {
   }

  ngOnInit(): void {
    this.ws.connect();
    this.ws.updates().pipe().subscribe(
      (msg)=> {console.info(msg)}
      )
  }

  ngOnDestroy(): void {
      this.ws.close()
  }

}


