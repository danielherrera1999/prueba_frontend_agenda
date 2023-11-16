import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ScheduleComponent
  ],
  imports: [
    CommonModule,
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
