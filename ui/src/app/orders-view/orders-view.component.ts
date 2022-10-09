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

export interface Orders {
  order: Order[],
  price: number,
  createdAt: string
  order_status:string
}

const STATIC_ORDERS: Orders[] = [
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
  }] 
  ,
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

  @Component({
    selector: 'app-orders-view',
    templateUrl: './orders-view.component.html',
    styleUrls: ['./orders-view.component.css']
  })
  export class OrdersViewComponent implements OnInit {
    displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date','drug_status','price_per_unit', 'total_price']
    footerDisplayColumns = ['createdAt', 'price', 'order_status']
    ordersData = STATIC_ORDERS;
    console = console;
    constructor() { }

    ngOnInit(): void {
    }

  }
