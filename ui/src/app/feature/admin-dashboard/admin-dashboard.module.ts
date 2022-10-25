import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivedOrdersComponent } from './archived-orders/archived-orders.component';
import { CurrentOrdersComponent } from './current-orders/current-orders.component';
import { CustomersComponent } from './customers/customers.component';
import { DrugsComponent } from './drugs/drugs.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ArchivedOrdersComponent,
    CurrentOrdersComponent,
    CustomersComponent,
    DrugsComponent

  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    AdminRoutingModule
  ],
  exports: [
  CommonModule,
    LayoutModule,
    SharedModule,
    AdminRoutingModule
  ]

})
export class AdminDashboardModule { }
