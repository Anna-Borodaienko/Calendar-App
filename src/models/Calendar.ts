/* eslint-disable no-unused-vars */
import moment from 'moment';
import { Month } from './Month';
import { Task } from './Task';
import { Day } from './Day';
import chunk from 'lodash.chunk';

export class Calendar {
  constructor(private readonly selectedMonth: Month) {}

  public static empty() {
    return new Calendar(Month.now());
  }

  public firstDay(): Day {
    return Day.fromMoment(
      moment({ year: this.selectedMonth.year, month: this.selectedMonth.month })
        .startOf('month')
        .startOf('isoWeek'),
    );
  }

  public lastDay(): Day {
    return Day.fromMoment(
      moment({ year: this.selectedMonth.year, month: this.selectedMonth.month })
        .endOf('month')
        .endOf('isoWeek'),
    );
  }

  public days(selectedMonthTasks: Task[]) {
    const calendar = [];
    const firstMoment = this.firstDay().toMoment();
    const lastMoment = this.lastDay().toMoment();

    let currentMoment = firstMoment.subtract(1, 'day');

    while (currentMoment.isBefore(lastMoment, 'day')) {
      currentMoment = currentMoment.add(1, 'day').clone();

      const day = Day.fromMoment(currentMoment);
      const tasks = selectedMonthTasks.filter((task) => Day.fromMoment(task.beginAt).equals(day));
      calendar.push({ day, tasks });
    }

    return chunk(calendar, 7);
  }
}
