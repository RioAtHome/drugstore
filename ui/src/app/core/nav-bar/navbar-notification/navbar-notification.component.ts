import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs';
import { WebSocketService } from '../../services/web-socket.service';
import { Notification } from 'src/app/shared/models';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar-notification',
  templateUrl: './navbar-notification.component.html',
  styleUrls: ['./navbar-notification.component.css']
})
export class NavbarNotificationComponent implements OnInit, OnDestroy {
  messages: Notification[] = [];
  unSeenMessages = 0;


  constructor(private ws: WebSocketService) {

   }

  ngOnInit(): void {

    this.ws.connect();
    this.ws.updates().pipe().subscribe(
      (msg)=> {
        msg.forEach((obj:Notification) => {
          const date = obj.created_at;
          obj.created_at = new Date(date);
          this.messages.push(obj);
        })
        this.messages.sort((objA, objB) => Number(objB.created_at) - Number(objA.created_at))
        this.messages.forEach((obj)=> {
          if(!obj.seen){
            this.unSeenMessages +=1;
          }
        })
        
      }
      )
  }

  setAllSeen(){
    this.unSeenMessages = 0;
    this.messages.forEach((obj)=>{obj.seen = true})

  }

  timePassed(date: string | Date): string{
    const createdDate = new Date(date)
    const nowTime = new Date();
    const diff = nowTime.getTime() - createdDate.getTime();
    let time = 1000;
    if(diff/time < 60){
      return `${Math.ceil(diff/time)}s`
    }
    time = 1000 * 60
    if (diff/time < 60){
     return `${Math.ceil(diff/time)}m` 
    }
    time = 1000 * 60 * 60
    if (diff/time < 60){
      return `${Math.ceil(diff/time)}h` 
    }
    return '...';

  }

  ngOnDestroy(): void {
      this.ws.close()

  }

}


