import { Result } from "src/app/core/interceptor/results/result-data";
import { ScheduleDom } from "./model/schedule.dom";
import { Failure } from "src/app/core/interceptor/failure/failure";

export abstract class ScheduleRepositoryDom {
  abstract list() : Promise<Result<ScheduleDom[], Failure>>;
  abstract getByDayOfWeek(dayOfWeek: string): Promise<Result<ScheduleDom[], Failure>>;
}
