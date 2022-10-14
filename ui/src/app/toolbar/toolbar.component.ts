import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  styleClass: string = 'toolbar-tranparent';


  constructor(private router: Router, private auth: AuthService) {
    console.log('toolbar');
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {          
              if(event.url !== '/'){
                this.styleClass = 'toolbar';
              }
              if(event.url === '/' || event.url.includes('/#')){
                this.styleClass = 'toolbar-tranparent'; 
           }
        }
    });
  }

  ngOnInit(): void {
  }

  isAuthenticated(): boolean{
    console.log("isAuthenticated()")
    return this.auth.isAuthenticated();
  }

  navToSection(section: string, route: string): void{
    this.router.navigateByUrl(route).then(()=> {
    const element = document.querySelector(section);
    if (element){
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    });
    
  }

}
