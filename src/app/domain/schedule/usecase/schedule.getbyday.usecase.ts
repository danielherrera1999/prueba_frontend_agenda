import { Injectable } from "@angular/core";
import { Result } from "src/app/core/interceptor/results/result-data";
import { Query } from "src/app/core/interceptor/usecase/query";
import { ScheduleDom } from "../model/schedule.dom";
import { Failure } from "src/app/core/interceptor/failure/failure";
import { NoParams } from "src/app/core/interceptor/usecase/noParams";
import { ScheduleRepositoryDom } from "../schedule.repository";

@Injectable({
  providedIn: 'root'
})
export class GetByDayScheduleUsecaseDom extends Query<Promise<Result<ScheduleDom[], Failure>>, string> {

  constructor(
    private readonly scheduleRepositoryDom: ScheduleRepositoryDom
  ) {
    super();
  }

  execute = async (param: string): Promise<Result<ScheduleDom[], Failure>> => this.scheduleRepositoryDom.getByDayOfWeek(param);
}
