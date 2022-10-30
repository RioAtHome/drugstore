import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { RestService } from './rest.service';
import { LogService } from './log.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServicesModule {
  constructor(@Optional() @SkipSelf() parentModule?: ServicesModule) {
  if (parentModule) {
    throw new Error(
      'ServicesModule is already loaded. Import it in the AppModule only');
  }
}
  static forRoot(): ModuleWithProviders<ServicesModule>{
    return {
      ngModule: ServicesModule,
      providers: [
      {provide: AuthService},
      {provide: RestService},
      {provide: LogService}
      ]
    }
  }
}
