import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archived-orders',
  templateUrl: './archived-orders.component.html',
  styleUrls: ['./archived-orders.component.css']
})
export class ArchivedOrdersComponent implements OnInit {
  editable: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
