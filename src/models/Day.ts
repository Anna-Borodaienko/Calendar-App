/* eslint-disable no-unused-vars */
import moment, { Moment } from 'moment';

export class Day {
  private readonly moment: Moment;

  constructor(
    public readonly day: number,
    public readonly month: number,
    public readonly year: number,
  ) {
    this.moment = moment({ date: this.day, month: this.month, year: this.year });
  }

  public static fromMoment(moment: Moment): Day {
    return new Day(moment.date(), moment.month(), moment.year());
  }

  public static fromDate(date: Date): Day {
    return new Day(date.getDate(), date.getMonth(), date.getFullYear());
  }

  public static now(): Day {
    return this.fromMoment(moment());
  }

  public isWeekend() {
    return this.moment.format('dd') === 'Su' || this.moment.format('dd') === 'Sa';
  }

  public dayOfWeek() {
    return this.moment.format('dd');
  }

  public toMoment() {
    return this.moment.clone();
  }

  public equals(other: Day) {
    return this.day === other.day && this.month === other.month && this.year === other.year;
  }
}
