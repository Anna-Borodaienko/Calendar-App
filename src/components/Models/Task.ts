import { Moment } from 'moment';

export interface Task {
  title: string;
  description: string;
  date: string;
  beginTime: string;
  createdAt: Moment;
  updatedAt?: Moment;
}
