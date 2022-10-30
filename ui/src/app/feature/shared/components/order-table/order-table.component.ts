import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/core/services/rest.service';
import { Drug, Order } from 'src/app/shared/models';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { EditOrderDialogComponent } from '../edit-order-dialog/edit-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit, OnDestroy {
    COLOR = {
    PE:  'pending-color',
    CO: 'completed-color',
    RE: 'cancelled-color',
    CA: 'cancelled-color',
  }

  @Input() editable: boolean = false;
  @Input() orders: Order[] = [];
  @Input() isAdmin: boolean = false;
  @Output() markEvent = new EventEmitter<Order>()
  checkedOrders: Order[] = []
  changeStatusSubscription = new Subscription
  displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date','price_per_unit', 'total_price'];
  footerDisplayColumns = ['id', 'drug_name', 'quantity', 'expiration_date','price_per_unit', 'total_price'];
  
  constructor(public dialog: MatDialog, private restClient: RestService) { }

  ngOnInit(): void {
    if(this.editable){
        this.displayedColumns.push('actions');
        this.footerDisplayColumns.push('actions')
      }
  }

 onMark(event: MatCheckboxChange, order: Order){
    order.status = "CO"
    
    if(event.checked){
      this.checkedOrders.push(order)
      return
    }
    order.status = "PE"
    this.checkedOrders = this.checkedOrders.filter((checkedOrder)=> {
      return checkedOrder.id !== order.id;
    })
  }

  onEdit(order: Order, enterAnimationDuration: string, exitAnimationDuration: string){
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
      ).unsubscribe()
  }

  onSave(){
     this.changeStatusSubscription = this.restClient.changeBatchStatus(this.checkedOrders).subscribe(
      (res) => {
        window.location.reload();
      }
      )
  }
  statusColor(status: string | undefined): string{
    return this.COLOR[status as keyof typeof this.COLOR]
  }

  ngOnDestroy() {
    if(this.changeStatusSubscription){
    this.changeStatusSubscription.unsubscribe();}
  }

}
