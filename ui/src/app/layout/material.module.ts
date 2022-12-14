import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatSliderModule } from '@angular/material/slider'; 
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CdkTableModule } from '@angular/cdk/table'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
  CommonModule,
  CdkTableModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatBadgeModule,
  MatGridListModule,
  MatSliderModule,
  MatCardModule,
  MatInputModule,
  MatButtonToggleModule,  
  MatPaginatorModule,  
  MatTableModule,
  MatCheckboxModule,
  MatDialogModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  ]
})
export class MaterialModule { }
