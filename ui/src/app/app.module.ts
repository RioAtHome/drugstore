// TODO: Unsubscribe from observables
// TODO: Divide to ngModules to enable lazy_loading
// TODO: enable intercepter

import { importProvidersFrom, NgModule } from '@angular/core';
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

import { FlexLayoutModule } from '@angular/flex-layout';
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
import { AuthGuardServiceService } from './shared/auth-guard-service.service';
import { RoleGuardServiceService } from './shared/role-guard-service.service';
import { ProfilePictureDialogComponent } from './profile-picture-dialog/profile-picture-dialog.component';
import { SearchPipe } from './shared/search.pipe';
import { OrderStatusDialogComponent } from './order-status-dialog/order-status-dialog.component';
import { StringToDatePipe } from './shared/string-to-date.pipe';
import { AcronymToStatusPipe } from './shared/acronym-to-status.pipe';
import { EditOrderDialogComponent } from './edit-order-dialog/edit-order-dialog.component';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    ProfilePictureDialogComponent,
    SearchPipe,
    OrderStatusDialogComponent,
    StringToDatePipe,
    AcronymToStatusPipe,
    EditOrderDialogComponent,
    UploadFileDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'signin', component: SigninComponent},
      {path: 'admin', canActivate: [RoleGuardServiceService], children:[
        {path: '', redirectTo: 'customers', pathMatch: 'full'},
        {path: 'customers', component: AdminViewCustomersComponent},
        {path: 'current-orders', component: AdminCurrentOrdersComponent},
        {path: 'archived-orders', component: AdminArchivedOrdersComponent},
        {path: 'drugs', component: AdminViewDrugsComponent},
      ]},
        {path: 'account', component: AccountDashboardComponent, canActivate: [AuthGuardServiceService], children:[
          {path: '', redirectTo: 'info', pathMatch: 'full'},
          {path: 'order', component:NewOrderComponent},
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
