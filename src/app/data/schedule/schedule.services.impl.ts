import { Injectable } from '@angular/core';
import { AxiosDataSource } from 'src/app/core/interceptor/axios/axios-datasource';
import { Failure, ServerFailure } from 'src/app/core/interceptor/failure/failure';
import { Left, Result, Right } from 'src/app/core/interceptor/results/result-data';
import { ScheduleDom } from 'src/app/domain/schedule/model/schedule.dom';
import { ScheduleRepositoryDom } from 'src/app/domain/schedule/schedule.repository';
import { ScheduleDto } from './dto/schedule.dto';
import { ScheduleMapper } from './map/schedule.map';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ScheduleRepositoryImplService extends AxiosDataSource implements ScheduleRepositoryDom {

  private jsonUrl = "https://luegopago.blob.core.windows.net/luegopago-uploads/Pruebas%20LuegoPago/data.json";

  async list(): Promise<Result<ScheduleDom[], Failure>> {
    try {
      const res: AxiosResponse<ScheduleDto[]> = await this.get<ScheduleDto[]>(
        this.jsonUrl
      );
      return new Right<ScheduleDom[]>(res.data.map((_) => ScheduleMapper.mapDTOtoDOM(_)));
    } catch (error) {
      return new Left<ServerFailure>(new ServerFailure(''));
    }
  }

  async getByDayOfWeek(dayOfWeek: string): Promise<Result<ScheduleDom[], Failure>> {
    try {
      const res: AxiosResponse<ScheduleDto[]> = await this.get<ScheduleDto[]>(
        this.jsonUrl
      );
      const data = res.data.map((_) => ScheduleMapper.mapDTOtoDOM(_));
      const schedulesForDay = data.filter(_ => _.day === dayOfWeek);
      return new Right<ScheduleDom[]>(schedulesForDay);
    } catch (error) {
      return new Left<ServerFailure>(new ServerFailure(''));
    }

  }
}
