import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/core/services/rest.service';
import { Customer, ListCustomers } from 'src/app/shared/models';
import { UploadFileDialogComponent } from '../../shared/components/upload-file-dialog/upload-file-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customerData = new MatTableDataSource<Customer>([]);
  error: string = '';
  initalResponse?: ListCustomers;

  @ViewChild(MatTable, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;

  displayedColumns = ['account_number', 'pharmacy_name', 'latitude', 'longitude']
  
  constructor(private restClient: RestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCustomer((this.currentPage + 1).toString());
  
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
      const dialog = this.dialog.open(UploadFileDialogComponent, {
        width: '450px',
        enterAnimationDuration,
        exitAnimationDuration,
        autoFocus: false,
        restoreFocus: false

      })
    
      dialog.afterClosed().subscribe(
      (shouldReload: boolean) => {
      if(shouldReload) {
      window.location.reload()
      }})
    }

  pageChanged(event: PageEvent){
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.getAllCustomer((this.currentPage + 1).toString())
    }
  getAllCustomer(page: string) {
    this.restClient.getAllCustomer(page).subscribe(
      (res) => {
        this.initalResponse = res;
        this.totalRows=this.initalResponse.count;
        this.paginator.length = this.initalResponse.count;
        this.paginator.pageIndex = this.currentPage;
        this.customerData.data = this.initalResponse.results;

      },
      (err) => {this.error = err}
      )

  }


}
