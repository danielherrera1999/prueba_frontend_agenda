import { Injectable } from '@angular/core';
import { ScheduleDto } from '../dto/schedule.dto';
import { ScheduleDom } from 'src/app/domain/schedule/model/schedule.dom';

@Injectable({
  providedIn: 'root'
})
export class ScheduleMapper {
  static mapDTOtoDOM(dto: ScheduleDto) : ScheduleDom {
    const dom: ScheduleDom = <ScheduleDom>{
      day: dto.Day,
      hour: dto.Hour,
      duration: dto.Duration
    };
    return dom;
  };
}
