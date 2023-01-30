import { Moment } from 'moment';

export interface Task {
  title: string;
  description: string;
  // date: string;
  // beginTime: string;
  beginAt: Moment;
  createdAt: Moment;
  updatedAt?: Moment;
}
