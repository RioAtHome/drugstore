import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ToolbarProfileComponent } from './toolbar-profile/toolbar-profile.component';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http';

import { ToolbarNotificationComponent } from './toolbar-notification/toolbar-notification.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { MaterialModule } from './material/material.module';
import { MaterialIconsService } from './material-icons.service';
import { SigninComponent } from './signin/signin.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { CurrentOrdersComponent } from './current-orders/current-orders.component';
import { ArchivedOrdersComponent } from './archived-orders/archived-orders.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { AdminArchivedOrdersComponent } from './admin-archived-orders/admin-archived-orders.component';
import { AdminCurrentOrdersComponent } from './admin-current-orders/admin-current-orders.component';
import { AdminViewCustomersComponent } from './admin-view-customers/admin-view-customers.component';
import { AdminViewDrugsComponent } from './admin-view-drugs/admin-view-drugs.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    HomeComponent,
    ToolbarProfileComponent,
    ToolbarNotificationComponent,
    ToolbarUserComponent,
    SigninComponent,
    AccountDashboardComponent,
    UserMenuComponent,
    AccountInformationComponent,
    CurrentOrdersComponent,
    ArchivedOrdersComponent,
    OrdersViewComponent,
    NewOrderComponent,
    AdminArchivedOrdersComponent,
    AdminCurrentOrdersComponent,
    AdminViewCustomersComponent,
    AdminViewDrugsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'account/order', component:NewOrderComponent},
      {path: 'admin/customers', component: AdminViewCustomersComponent},
      {path: 'admin/current-orders', component: AdminCurrentOrdersComponent},
      {path: 'admin/archived-orders', component: AdminArchivedOrdersComponent},
      {path: 'admin/drugs', component: AdminViewDrugsComponent},
        {path: 'signin', component: SigninComponent},
        {path: 'account', component: AccountDashboardComponent, children:[
        {path: '', redirectTo: 'info', pathMatch: 'full'},
        {path: 'info', component: AccountInformationComponent},
        {path: 'current-orders', component: CurrentOrdersComponent},
        {path: 'archived-orders', component: ArchivedOrdersComponent},
        ]},
      ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
