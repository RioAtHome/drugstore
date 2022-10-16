import { Component, OnInit } from '@angular/core';
// import { Order } from '../shared/order';
// import { Drug, OrderedDrug } from '../shared/drug';
// import { AuthService } from '../shared/auth-service';
// import { RestServiceService } from '../shared/rest-service.service';
// import { Search } from '../shared/search.pipe';

export interface Order {
  id: string,
  drug_name:string,
  quantity: number,
  expiration_date: string,
  drug_status: string,
  price_per_unit: number,
  total_price: number,
}


const STATIC_ORDERS: Order[] = 

  [
  {
    id: '00000',
    drug_name:"string",
    quantity: 34,
    expiration_date: 'weeee',
    drug_status: 'Avaliable',
    price_per_unit: 66.5,
    total_price: 9000,
  },
  {
    id: '00000',
    drug_name:"string",
    quantity: 34,
    expiration_date: 'weeee',
    drug_status: 'Avaliable',
    price_per_unit: 66.5,
    total_price: 9000,
  },
  {
    id: '00000',
    drug_name:"string",
    quantity: 34,
    expiration_date: 'weeee',
    drug_status: 'Avaliable',
    price_per_unit: 66.5,
    total_price: 9000,
  }] 



@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date','price_per_unit', 'total_price', 'actions'];
  footerDisplayColumns = ['id', 'total_price']
  orderData = STATIC_ORDERS;

  constructor() { }

  ngOnInit(): void {
  }

  totalPrice(): number{
    return 80;
  }

}
