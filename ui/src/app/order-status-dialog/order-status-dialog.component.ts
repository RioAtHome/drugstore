import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-order-status-dialog',
  templateUrl: './order-status-dialog.component.html',
  styleUrls: ['./order-status-dialog.component.css']
})
export class OrderStatusDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderStatusDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {icon: string, order_status: string}) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.dialogRef.close(false);
  }

}
