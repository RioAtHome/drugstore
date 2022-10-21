import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ListCustomers, RestServiceService } from '../shared/rest-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable} from '@angular/material/table';
import { Order } from '../shared/order';
import { Drug, OrderedDrug } from '../shared/drug';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Customer } from '../shared/customer';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';


@Component({
  selector: 'app-admin-view-customers',
  templateUrl: './admin-view-customers.component.html',
  styleUrls: ['./admin-view-customers.component.css']
})
export class AdminViewCustomersComponent implements OnInit {
  customerData = new MatTableDataSource<Customer>([]);
  error: string = '';
  initalResponse?: ListCustomers;

  @ViewChild(MatTable, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns = ['account_number', 'pharmacy_name', 'latitude', 'longitude']
  
  constructor(private restClient: RestServiceService, private auth: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCustomer((this.currentPage + 1).toString());
  
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
      const dialog = this.dialog.open(UploadFileDialogComponent, {
        width: '800px',
        enterAnimationDuration,
        exitAnimationDuration
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
