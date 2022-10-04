import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public arr = new Array<number>(6);
  constructor() { }

  ngOnInit(): void {
  }

  onChange(){
    console.log("hello There General Kenobi")
  }

  onInput(){
    console.log("hello There General Kenobi")
  }

}
