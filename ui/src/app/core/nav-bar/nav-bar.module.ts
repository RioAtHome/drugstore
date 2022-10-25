import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarNotificationComponent } from './navbar-notification/navbar-notification.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { NavbarUserMenuComponent } from './navbar-user-menu/navbar-user-menu.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarNotificationComponent,
    NavbarUserComponent,
    NavbarUserMenuComponent
  ],
  imports: [
    LayoutModule,
    CommonModule,
    RouterModule

  ],
  exports: [

    NavbarComponent,
    LayoutModule,
    ]
})
export class NavBarModule { }
