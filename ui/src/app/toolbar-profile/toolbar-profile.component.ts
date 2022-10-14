import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-toolbar-profile',
  templateUrl: './toolbar-profile.component.html',
  styleUrls: ['./toolbar-profile.component.css']
})
export class ToolbarProfileComponent implements OnInit {
  @Input() authenticated: boolean = false;
  constructor() {
   }

  ngOnInit(): void {
  }

}
