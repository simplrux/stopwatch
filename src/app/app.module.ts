import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LcdComponent } from './components/lcd/lcd.component';

@NgModule({
  declarations: [
    AppComponent,
    LcdComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
