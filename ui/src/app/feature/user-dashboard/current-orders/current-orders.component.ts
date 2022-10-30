import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/core/services/rest.service';
import { ListCustomerOrders, Order } from 'src/app/shared/models';

@Component({
  selector: 'app-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.css']
})
export class CurrentOrdersComponent implements OnInit, OnDestroy {
  editable=true;
  currentOrders: Order[] = [];
  isAdmin = false;
  status = ["PE"];
  getOrdersSubscription = new Subscription
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
            this.currentOrders = this.initResponse.results;
            if(this.paginator){
              this.paginator.length = this.initResponse.count;
              this.paginator.pageIndex = this.currentPage;
            }
            
            
      },
      (err) => {}
      )

  }

  pageChanged(event: PageEvent){
      this.currentPage = event.pageIndex;
      this.getAllOrders({status: this.status}, (this.currentPage).toString())
    }

  ngOnDestroy(){
    if(this.getOrdersSubscription){this.getOrdersSubscription.unsubscribe()}
    
  }


}