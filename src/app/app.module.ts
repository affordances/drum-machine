import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

import { AppComponent } from './app.component';
import { MetronomeComponent } from './metronome/metronome.component';


@NgModule({
  declarations: [
    AppComponent,
    MetronomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
