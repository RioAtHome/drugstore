import { NgModule } from '@angular/core';
import { SigninComponent } from './signin.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes:Routes = [
  {path: '', component: SigninComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SigninRoutingModule { }
