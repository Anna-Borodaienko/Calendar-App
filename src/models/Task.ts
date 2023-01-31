import { Moment } from 'moment';

export interface Task {
  title: string;
  description: string;
  beginAt: Moment;
  createdAt: Moment;
  updatedAt?: Moment;
}
