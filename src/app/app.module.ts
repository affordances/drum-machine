import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NouisliderModule } from 'ng2-nouislider';

import { AppComponent } from './app.component';
import { StaffComponent } from './staff/staff.component';
import { ControlsComponent } from './controls/controls.component';


@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NouisliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
