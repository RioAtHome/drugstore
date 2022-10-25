import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { SigninRoutingModule } from './signin-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SigninComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    SigninRoutingModule
  ],
  exports:[
  SigninComponent,
  ]
})
export class SigninModule { }
