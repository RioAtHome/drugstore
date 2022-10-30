import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
import { NewOrderComponent } from './new-order/new-order.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { CurrentOrdersComponent } from './current-orders/current-orders.component';
import { ArchivedOrdersComponent } from './archived-orders/archived-orders.component';
import { RouterModule } from '@angular/router';

const routes: Routes =[ 
{path: '', component: DashboardComponent, canActivate: [AuthGuardGuard], children:[
          {path: '', redirectTo: 'info', pathMatch: 'full'},
          {path: 'order', component:NewOrderComponent},
          {path: 'info', component: AccountInformationComponent},
          {path: 'current-orders', component: CurrentOrdersComponent},
          {path: 'archived-orders', component: ArchivedOrdersComponent},
        ]}]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class UserRoutingModule { }
