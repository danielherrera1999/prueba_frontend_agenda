import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleRepositoryDom } from './domain/schedule/schedule.repository';
import { ScheduleRepositoryImplService } from './data/schedule/schedule.services.impl';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: ScheduleRepositoryDom, useClass: ScheduleRepositoryImplService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
