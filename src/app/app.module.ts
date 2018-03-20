import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

import { AppComponent } from './app.component';
import { MetronomeComponent } from './metronome/metronome.component';
import { StaffComponent } from './staff/staff.component';
import { ControlsComponent } from './controls/controls.component';


@NgModule({
  declarations: [
    AppComponent,
    MetronomeComponent,
    StaffComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
