import { Component } from '@angular/core';
import { MaterialIconsService } from './material-icons.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gaza Central Pharmacy';
  constructor (private materialIconService: MaterialIconsService) {
  }
}
