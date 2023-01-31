/* eslint-disable no-unused-vars */
import moment, { Moment } from 'moment';
import { Day } from './Day';

export class Month {
  private readonly moment: Moment;

  constructor(public readonly month: number, public readonly year: number) {
    this.moment = moment({ month: this.month, year: this.year });
  }

  public static fromMoment(moment: Moment): Month {
    return new Month(moment.month(), moment.year());
  }

  public static fromDate(date: Date): Month {
    return new Month(date.getMonth(), date.getFullYear());
  }

  public static now(): Month {
    return this.fromMoment(moment());
  }

  public increment() {
    return Month.fromMoment(this.moment.add(1, 'M'));
  }

  public decrement() {
    return Month.fromMoment(this.moment.subtract(1, 'M'));
  }

  public equals(other: Month) {
    return this.month === other.month && this.year === other.year;
  }

  public format(format: string) {
    return this.moment.format(format);
  }
}
