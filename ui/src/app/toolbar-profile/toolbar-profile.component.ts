import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-profile',
  templateUrl: './toolbar-profile.component.html',
  styleUrls: ['./toolbar-profile.component.css']
})
export class ToolbarProfileComponent implements OnInit {
  public Auth: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
