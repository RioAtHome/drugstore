import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes:Routes = [
  {path: '', component: HomeComponent},
]

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    LayoutModule,
    RouterModule.forChild(routes)
  ],
  exports:[
  HomeComponent,
  RouterModule
  ]
})
export class HomeModule { }
