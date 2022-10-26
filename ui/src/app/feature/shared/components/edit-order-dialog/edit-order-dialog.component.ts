import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order} from 'src/app/shared/models';

@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: './edit-order-dialog.component.html',
  styleUrls: ['./edit-order-dialog.component.css']
})
export class EditOrderDialogComponent implements OnInit {
  dialog = true;
  constructor(public dialogRef: MatDialogRef<EditOrderDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: {order: Order, dialog:true},
    ) { }

  ngOnInit(): void {
  }
  
  onCancel(){
    this.dialogRef.close(false);
  }
}
