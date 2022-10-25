import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninModule } from './signin/signin.module';
import { HomeModule } from './home/home.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { SharedModule } from './shared/shared.module';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SigninModule,
    HomeModule,
    SharedModule,
    AdminDashboardModule,
    UserDashboardModule
  ],
  exports: [
  SigninModule,
    HomeModule,
    AdminDashboardModule,
    UserDashboardModule
  ]
})
export class FeatureModule { }
