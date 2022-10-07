import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  styleClass: string = 'toolbar-tranparent';
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {          
              if(event.url !== '/'){
                this.styleClass = 'toolbar';
              }
        }
    });
  }

  ngOnInit(): void {
  }

}
