import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavLeftSideComponent } from './nav-left-side/nav-left-side.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { MyDiskComponent } from './my-disk/my-disk.component';
import { ComputerComponent } from './computer/computer.component';
import { AvailableComponent } from './available/available.component';
import { RecentComponent } from './recent/recent.component';
import { NoticedComponent } from './noticed/noticed.component';
import { TrashComponent } from './trash/trash.component';
import { LoginComponent } from './login/login.component';
import { DriveComponent } from './drive/drive.component';

@NgModule({
  declarations: [
    AppComponent,
    NavLeftSideComponent,
    NavTopComponent,
    MyDiskComponent,
    ComputerComponent,
    AvailableComponent,
    RecentComponent,
    NoticedComponent,
    TrashComponent,
    LoginComponent,
    DriveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
