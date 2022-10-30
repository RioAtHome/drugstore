import { Injectable, Optional, SkipSelf } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { switchAll, catchError, Subject} from 'rxjs';
import { AuthService } from './auth.service';
import { ServicesModule } from './services.module';


const WS_URL = 'ws://localhost:8000/ws/notification/';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
    private _socket : WebSocketSubject<any>;
    private _messagesSubject = new Subject<any>();
    messages = this._messagesSubject.pipe(switchAll(), catchError(err => {throw err}));
    constructor(private auth: AuthService, @Optional() @SkipSelf() parentModule?: ServicesModule) {
    if (parentModule){
        throw new Error("ServicesModule is already loaded")
    }
    console.info("WebSocket Service have been loaded!")
    }
    connect(){
        if(!this._socket || this._socket.closed){
            const token = this.auth.getAccessToken();
            const url = WS_URL + `?token=${token}`;
            this._socket = webSocket(url)
        }

        return this._socket
    }
  updates() {
    return this.connect().asObservable();
  }


    close(){
        this.connect().complete();
    }
}
