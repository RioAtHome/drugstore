import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ListCustomerOrders, RestServiceService } from '../shared/rest-service.service';
import { Order } from '../shared/order';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditOrderDialogComponent } from '../edit-order-dialog/edit-order-dialog.component';

  @Component({
    selector: 'app-orders-view',
    templateUrl: './orders-view.component.html',
    styleUrls: ['./orders-view.component.css']
  })
  export class OrdersViewComponent implements OnInit {
    displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date','price_per_unit', 'total_price'];
    footerDisplayColumns = ['id', 'quantity', 'total_price'];
    ordersData = new MatTableDataSource<Order>([]);
    error: string = '';
    initalResponse?: ListCustomerOrders;
    @Input() editable: boolean = false;
    @Input() query_status: string = 'PE';
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    totalRows = 0;
    pageSize = 10;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];



    constructor(private restClient: RestServiceService, public dialog: MatDialog) {

     }

    ngOnInit(): void {
      this.getListOrder(this.query_status, (this.currentPage + 1).toString());
      
      if(this.editable){
        this.displayedColumns.push('actions');
        this.footerDisplayColumns.push('actions')
      }
    }


    ngAfterViewInit() {
     
    }

    pageChanged(event: PageEvent){
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.getListOrder(this.query_status, (this.currentPage + 1).toString())
    }
    totalForOrder(order: Order): number{
      return order.ordered_drugs.reduce((acc: any, obj: any)=> {
      return acc + parseFloat(obj.total_drug_price);
    }, 0);
    }

    openDialog(order: Order, enterAnimationDuration: string, exitAnimationDuration: string){
      this.dialog.open(EditOrderDialogComponent, {
        width: '800px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {order: order}
      }).afterClosed().subscribe(
      (shouldReload: boolean) => {
      if(shouldReload) {
      window.location.reload()
      }
    }
      )
    }

    getListOrder(queryparms: string, page: string): void{
      this.restClient.getCustomerOrders(queryparms, page).subscribe(
          (res)=>{
      
            this.initalResponse = res;
            
            this.paginator.length = this.initalResponse.count

            this.paginator.pageIndex = this.currentPage;

            this.ordersData.data = this.initalResponse.results;

            
          },
          (err)=>{
            this.error = err;
          }
        )
    }

  }
