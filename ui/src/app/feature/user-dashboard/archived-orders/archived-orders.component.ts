import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/core/services/rest.service';
import { ListCustomerOrders, Order } from 'src/app/shared/models';

@Component({
  selector: 'app-archived-orders',
  templateUrl: './archived-orders.component.html',
  styleUrls: ['./archived-orders.component.css']
})
export class ArchivedOrdersComponent implements OnDestroy, OnInit {
  editable=false;
  archivedOrders: Order[] = [];
  isAdmin = false;
  status = ['CO', 'CA', 'RE'];
  getOrdersSubscription = new Subscription
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;

  error: string = '';
  initResponse?: ListCustomerOrders;
  constructor(private restClient: RestService) { }

  ngOnInit(): void {
    this.getAllOrders({status: this.status}, (this.currentPage + 1).toString())
  }

  getAllOrders(status: any, page: string){
    const query = {status: status, page: page}
    this.getOrdersSubscription = this.restClient.getCustomerOrders(status, page).subscribe(
      (res) =>{
        this.initResponse = res;
            if(this.paginator){
              this.paginator.length = this.initResponse.count
            this.paginator.pageIndex = this.currentPage;
            }
            this.archivedOrders = this.initResponse.results;
      },
      (err) =>{}
      )
  }

  pageChanged(event: PageEvent){
      this.currentPage = event.pageIndex;
      this.getAllOrders({status: this.status}, (this.currentPage).toString())
    }

  ngOnDestroy(){
    if(this.getOrdersSubscription){
    this.getOrdersSubscription.unsubscribe()
  }}
}
