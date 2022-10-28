import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    styleClass: string = 'toolbar-tranparent';
  constructor(private router: Router, private auth: AuthService) {
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
    console.info("nav have been created")
  }

  isAuthenticated(): boolean{
    console.info("isAuthenticated have been called")
    return this.auth.isAuthenticated();
  }

  navToSection(section: string, route: string): void{
    this.router.navigateByUrl(route).then(()=> {
    const element = document.querySelector(section);
    if (element){
      element.scrollIntoView();
    }
    });
    
  }

}
