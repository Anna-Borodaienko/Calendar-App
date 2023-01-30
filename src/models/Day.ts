import { Task } from './Task';

export interface Day {
  tasks: Task[];
  day: number;
  month: number;
  year: number;
}
