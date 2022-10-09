import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { CardSliderComponent } from './card-slider/card-slider.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { CurrentOrdersComponent } from './current-orders/current-orders.component';
import { ArchivedOrdersComponent } from './archived-orders/archived-orders.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';


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
    CardSliderComponent,
    AccountDashboardComponent,
    UserMenuComponent,
    AccountInformationComponent,
    CurrentOrdersComponent,
    ArchivedOrdersComponent,
    OrdersViewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
        {path: 'signin', component: SigninComponent},
        {path: 'account', component: AccountDashboardComponent, children:[
        {path: '', redirectTo: 'account/info', pathMatch: 'full'},
        {path: 'account/info', component: AccountInformationComponent},
        {path: 'account/current-orders', component: CurrentOrdersComponent},
        {path: 'account/archived-orders', component: ArchivedOrdersComponent}
        ]},
      ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
