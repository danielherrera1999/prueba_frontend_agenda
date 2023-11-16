import { Component, OnInit } from '@angular/core';
import { ServerFailure } from 'src/app/core/interceptor/failure/failure';
import { Result } from 'src/app/core/interceptor/results/result-data';
import { NoParams } from 'src/app/core/interceptor/usecase/noParams';
import { ScheduleDom } from 'src/app/domain/schedule/model/schedule.dom';
import { ListScheduleUsecaseDom } from 'src/app/domain/schedule/usecase/schedule.list.usecase';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(
    private readonly _listScheduleUsecaseDom: ListScheduleUsecaseDom,
  ) { }

  items: ScheduleDom[] = [];

  ngOnInit(): void {
    this.getData()
  }

  async getData(){
    const noParams: NoParams = {};
    const result = await this._listScheduleUsecaseDom.execute(noParams)
    result.result((_) => this.items = _ , (err) => this.items = [])
  }
}
