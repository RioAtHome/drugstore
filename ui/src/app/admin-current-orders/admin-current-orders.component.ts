import { Component, OnInit } from '@angular/core';

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

const STATIC_PHARMACY_ORDERS = [
{
  pharmacy_name: "somePharamcyName",
  orders: [
  {
    order:[{
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
    }] ,
    price: 233,
    createdAt: "SomeDate",
    order_status: 'Pending'
  },
  {
    order: [{
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
    }],
    price: 2334,
    createdAt: "SomeDateBaby",
    order_status: 'Pending'
  }

  ]
}
]

@Component({
  selector: 'app-admin-current-orders',
  templateUrl: './admin-current-orders.component.html',
  styleUrls: ['./admin-current-orders.component.css']
})
export class AdminCurrentOrdersComponent implements OnInit {
  activeOrders = STATIC_PHARMACY_ORDERS;
  console = console;
  displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date','price_per_unit', 'total_price'];
  footerDisplayColumns = ['id', 'quantity', 'total_price', 'actions'];
  constructor() { }

  ngOnInit(): void {
  }

}
