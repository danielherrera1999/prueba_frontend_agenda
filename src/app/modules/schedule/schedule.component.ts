import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarApi, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { NoParams } from 'src/app/core/interceptor/usecase/noParams';
import { ScheduleDom } from 'src/app/domain/schedule/model/schedule.dom';
import { GetByDayScheduleUsecaseDom } from 'src/app/domain/schedule/usecase/schedule.getbyday.usecase';
import { ListScheduleUsecaseDom } from 'src/app/domain/schedule/usecase/schedule.list.usecase';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  constructor(
    private readonly _listScheduleUsecaseDom: ListScheduleUsecaseDom,
    private readonly _getByDayScheduleUsecaseDom: GetByDayScheduleUsecaseDom
  ) { }

  @ViewChild('calendar') calendar: FullCalendarComponent | undefined;


  itemsSelect: String[] = [];
  selectedDay: string | null = null;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGrigPlugin, interactionPlugin],
    initialView: 'timeGridDay',
    weekends: false,
    selectable: true,
    headerToolbar: {
      right: 'timeGridDay'
    },
    locales: [esLocale],
    locale: 'es',
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: '09:00',
      endTime: '17:00'
    },
    slotMinTime: '09:00',
    slotMaxTime: '17:00',
    contentHeight: 400
  };
  dayAvailable= 0;

  ngOnInit(): void {
    this.getDataSelect()
  }

  async getDataSelect(){
    const noParams: NoParams = {};
    const result = await this._listScheduleUsecaseDom.execute(noParams)
    result.result(
      (value) => {
        this.itemsSelect = [...new Set(value.map(item => item.day))];
      },
      (error) => {
        this.itemsSelect = [];
        console.error("Error getting data:", error);
      }
    );
  }

  addEventsToCalendar(items: ScheduleDom[]) {
    if (this.calendar && this.selectedDay) {
      const dayOfWeek = this.mapSpanishDayToNumber(this.selectedDay);

      if (dayOfWeek === -1) {
        console.error('Error: Invalid day of the week.');
        return;
      }

      const start = new Date();
      start.setDate(start.getDate() + (dayOfWeek + (7 - start.getDay())) % 7);
      start.setHours(9, 0, 0, 0);

      const end = new Date(start);
      end.setHours(17, 0, 0, 0);

      const calendarApi = this.calendar.getApi();
      calendarApi.removeAllEvents();

      if (calendarApi) {
        calendarApi.gotoDate(start);
        items.forEach(item => {
          const [hours, minutes] = item.hour.split(':');

          const eventStart = new Date(start);
          eventStart.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

          const eventEnd = new Date(eventStart);
          eventEnd.setMinutes(eventEnd.getMinutes() + parseInt(item.duration, 10));

          calendarApi.addEvent({
            title: 'Date',
            start: eventStart,
            end: eventEnd,
          });
        })
      } else {
        console.error('Error: Calendar API is null.');
      }
    }
  }

  async onDaySelectChange(){
    try {
      if (!this.selectedDay) {
        return;
      }
      const result = await this._getByDayScheduleUsecaseDom.execute(this.selectedDay);

      result.resultRight((selectedDayCitas) => {
        this.addEventsToCalendar(selectedDayCitas);
        const totalMinutesOccupied = selectedDayCitas.reduce((total, _) => total + parseInt(_.duration), 0);
        const totalAvailableSpaces = 480 - totalMinutesOccupied;
        this.dayAvailable = Math.floor(totalAvailableSpaces / 30);
      });

      result.resultLeft((error) => {
        console.error("Error in obtaining appointments per day:", error);
      });

    } catch (error) {
      console.error("Error when calculating available spaces:", error);
    }
  }


  mapSpanishDayToNumber(day: string): number {
    switch (day.toLowerCase()) {
      case 'lunes':
        return 1;
      case 'martes':
        return 2;
      case 'miércoles':
        return 3;
      case 'jueves':
        return 4;
      case 'viernes':
        return 5;
      default:
        return -1;
    }
  }
}
