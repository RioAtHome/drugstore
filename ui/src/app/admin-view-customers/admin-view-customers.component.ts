import { Component, OnInit } from '@angular/core';

export interface Customer {
  account_number: string,
  pharmacy_name: string
  latitude: string,
  longitude: string
}


const STATIC_DATA: Customer[] = [
{account_number: '1231',
pharmacy_name: 'ayeo',
latitude: 'fake',
longitude: 'fakyyy'
},{account_number: '1231',
pharmacy_name: 'ayeo',
latitude: 'fake',
longitude: 'fakyyy'
}
]


@Component({
  selector: 'app-admin-view-customers',
  templateUrl: './admin-view-customers.component.html',
  styleUrls: ['./admin-view-customers.component.css']
})
export class AdminViewCustomersComponent implements OnInit {
  customerData = STATIC_DATA;
  displayedColumns = ['account_number', 'pharmacy_name', 'latitude', 'longitude']
  constructor() { }

  ngOnInit(): void {
  }

}
