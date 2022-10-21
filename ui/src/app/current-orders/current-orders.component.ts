import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.css']
})
export class CurrentOrdersComponent implements OnInit {
  canEdit = true;
  query_status = 'PE';
  constructor() { }

  ngOnInit(): void {
  }

}
