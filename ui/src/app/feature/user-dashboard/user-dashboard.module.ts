import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivedOrdersComponent } from './archived-orders/archived-orders.component';
import { CurrentOrdersComponent } from './current-orders/current-orders.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { SearchPipe } from '../shared/pipes/search.pipe';

@NgModule({
  declarations: [
    ArchivedOrdersComponent,
    CurrentOrdersComponent,
    AccountInformationComponent,
    NewOrderComponent,
    UserMenuComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    UserRoutingModule,
  ],
  exports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    UserRoutingModule,
    NewOrderComponent,
  ]
})
export class UserDashboardModule { }
