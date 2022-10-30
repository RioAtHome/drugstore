import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { FooterModule } from './footer/footer.module';
import { ServicesModule } from './services/services.module';
import { LayoutModule } from '../layout/layout.module';
import { AppRouteModule } from './router/app-route.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    NavBarModule,
    FooterModule,
    ServicesModule.forRoot(),
    AppRouteModule,
    HttpClientModule
  ],
  exports:[
  NavBarModule,
    FooterModule,
    ServicesModule,
    AppRouteModule,
    HttpClientModule,
    AppRouteModule,
    LayoutModule
  ]
})
export class CoreModule {
  
}