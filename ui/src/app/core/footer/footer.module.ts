import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
  FooterComponent],
  imports: [
    LayoutModule,
    CommonModule
  ],
  exports: [FooterComponent]

})
export class FooterModule { }
