import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { AcronymToStatusPipe } from './pipes/acronym-to-status.pipe';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FilterComponent } from './components/filter/filter.component';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedRoutingModule } from './shared-routing.module';
import { UploadFileDialogComponent } from './components/upload-file-dialog/upload-file-dialog.component';

@NgModule({
  declarations: [
    StringToDatePipe,
    AcronymToStatusPipe,
    OrderTableComponent,
    FilterComponent,
    NoResultsComponent,
    PageNotFoundComponent,
    UploadFileDialogComponent,


  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedRoutingModule
  ],
exports:[
  
  StringToDatePipe,
  AcronymToStatusPipe,
  OrderTableComponent,
  FilterComponent,
  SharedRoutingModule,
  NoResultsComponent,
  PageNotFoundComponent
]
})
export class SharedModule { }
