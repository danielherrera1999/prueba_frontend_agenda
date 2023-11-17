import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    RouterModule.forChild([
      {
        path: '',
        component: ScheduleComponent,
      },
    ]),
  ],
  exports: [ScheduleComponent]
})
export class ScheduleModule { }
