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
import { OrderStatusDialogComponent } from './components/order-status-dialog/order-status-dialog.component';
import { ProfilePictureDialogComponent } from './components/profile-picture-dialog/profile-picture-dialog.component';
import { EditOrderDialogComponent } from './components/edit-order-dialog/edit-order-dialog.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    StringToDatePipe,
    AcronymToStatusPipe,
    OrderTableComponent,
    FilterComponent,
    NoResultsComponent,
    PageNotFoundComponent,
    UploadFileDialogComponent,
    ProfilePictureDialogComponent,
    OrderStatusDialogComponent,
    EditOrderDialogComponent,
    SearchPipe,


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
  ProfilePictureDialogComponent,
  OrderStatusDialogComponent,
  PageNotFoundComponent,
  SearchPipe
]
})
export class SharedModule { }
