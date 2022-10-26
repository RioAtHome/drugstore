import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/core/services/rest.service';
import { Drug, ListDrugs } from 'src/app/shared/models';
import { UploadFileDialogComponent } from '../../shared/components/upload-file-dialog/upload-file-dialog.component';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.css']
})
export class DrugsComponent implements OnInit {
  drugsSource = new MatTableDataSource<Drug>([]);
  error: string = '';
  initalResponse?: ListDrugs;

  @ViewChild(MatTable, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;

  displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date', 'price_per_unit']
  
  constructor(private restClient: RestService, public dialog: MatDialog) { }

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
