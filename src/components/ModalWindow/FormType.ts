import { Moment } from 'moment';

export interface FormType {
  title: string;
  description: string;
  date: string;
  beginTime: string;
  createdAt?: Moment;
  uodatedAt?: Moment;
}
