import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsService } from './icons.service';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [IconsService],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LayoutModule {
  constructor(private materialIconService: IconsService){}
}
