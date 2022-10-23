import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Drug } from '../shared/drug';
import { RestServiceService } from '../shared/rest-service.service';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';
import { MatDialog } from '@angular/material/dialog';



export interface ListDrugs{
  count: number,
  next: string,
  previous?: string,
  results: Drug[]
}
@Component({
  selector: 'app-admin-view-drugs',
  templateUrl: './admin-view-drugs.component.html',
  styleUrls: ['./admin-view-drugs.component.css']
})
export class AdminViewDrugsComponent implements OnInit {
  drugsSource = new MatTableDataSource<Drug>([]);
  error: string = '';
  initalResponse?: ListDrugs;

  @ViewChild(MatTable, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date', 'price_per_unit']
  constructor(private restClient: RestServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDrugs((this.currentPage + 1).toString())
  }


  pageChanged(event: PageEvent){
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.getDrugs((this.currentPage + 1).toString())
    }
   openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
      const dialog = this.dialog.open(UploadFileDialogComponent, {
        width: '800px',
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

  getDrugs(page: string): void{
    this.restClient.getAllDrugs(false, page).subscribe(
      (res)=> {
        this.initalResponse = res as unknown as ListDrugs;

        this.totalRows=this.initalResponse.count;
        this.paginator.length = this.initalResponse.count;
        this.paginator.pageIndex = this.currentPage;
        this.drugsSource.data = this.initalResponse.results;
        this.table.renderRows();
      },
      (err)=> {}
      )
  }

}
