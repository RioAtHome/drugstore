import { NgModule } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { RouterModule } from '@angular/router';


const routes: Routes = [
      {path: '', loadChildren: ()=>import('src/app/feature/home/home.module').then(m => m.HomeModule)},
      {path: 'signin', loadChildren: () => import('src/app/feature/signin/signin-routing.module').then(m => m.SigninRoutingModule)},
      {path: 'admin', loadChildren: () => import('src/app/feature/admin-dashboard/admin-routing.module').then(m => m.AdminRoutingModule)},
      {path: 'account', loadChildren: () => import('src/app/feature/user-dashboard/user-routing.module').then(m => m.UserRoutingModule)},
      {path: '**', loadChildren: ()=>import('src/app/feature/shared/shared-routing.module').then(m=> m.SharedRoutingModule)}
      ]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRouteModule { }
