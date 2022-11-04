import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-status-dialog',
  templateUrl: './order-status-dialog.component.html',
  styleUrls: ['./order-status-dialog.component.css']
})
export class OrderStatusDialogComponent {

  constructor(public dialogRef: MatDialogRef<OrderStatusDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {icon: string, order_status: string}) { }


  onSubmit(){
    if(this.data.icon==="highlight_off"){
    this.dialogRef.close(false)
    return  
    }
    this.dialogRef.close(true)
    
  }

}
