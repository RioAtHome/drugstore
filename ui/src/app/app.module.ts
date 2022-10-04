import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ToolbarProfileComponent } from './toolbar-profile/toolbar-profile.component';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http';

import { ToolbarNotificationComponent } from './toolbar-notification/toolbar-notification.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { MaterialModule } from './material/material.module';
import { MaterialIconsService } from './material-icons.service';
import { SigninComponent } from './signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    HomeComponent,
    ToolbarProfileComponent,
    ToolbarNotificationComponent,
    ToolbarUserComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
        {path: 'signin', component: SigninComponent},
      ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
