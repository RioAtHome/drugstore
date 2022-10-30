import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivedOrdersComponent } from './archived-orders/archived-orders.component';
import { CurrentOrdersComponent } from './current-orders/current-orders.component';
import { CustomersComponent } from './customers/customers.component';
import { DrugsComponent } from './drugs/drugs.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardGuard } from 'src/app/core/guards/role-guard.guard';


const routes:Routes = [
{path: '', canActivate: [RoleGuardGuard], children:[
        {path: '', redirectTo: 'customers', pathMatch: 'full'},
        {path: 'customers', component: CustomersComponent},
        {path: 'current-orders', component: CurrentOrdersComponent},
        {path: 'archived-orders', component: ArchivedOrdersComponent},
        {path: 'drugs', component: DrugsComponent},
      ]}

]

@NgModule({
  declarations: [],
  imports: [
  RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
