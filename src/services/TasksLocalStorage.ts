import moment from 'moment';
import { Task } from '../models/Task';
import { Day } from '../models/Day';

export class TasksLocalStorage {
  public getTasksForTheSameDay(task: Task): Task[] {
    const taskDay = this.getTaskDay(task);

    if (!localStorage.getItem(taskDay)) return [];

    return JSON.parse(localStorage.getItem(taskDay)!).map((taskObj: any) =>
      this.fromLocalStorage(taskObj),
    );
  }

  public getTasksByDay(day: Day): Task[] {
    const taskDay = day.toMoment().format('YYYY-MM-DD');

    if (!localStorage.getItem(taskDay)) return [];

    return JSON.parse(localStorage.getItem(taskDay)!).map((taskObj: any) =>
      this.fromLocalStorage(taskObj),
    );
  }

  public getTasksByDateRange(from: Day, to: Day): Task[] {
    const tasks: Task[] = [];

    const fromMoment = from.toMoment();
    const toMoment = to.toMoment();

    let currentMoment = fromMoment.subtract(1, 'day');

    while (currentMoment.isBefore(toMoment, 'day')) {
      currentMoment = currentMoment.add(1, 'day').clone();
      const tasksForDay = this.getTasksByDay(Day.fromMoment(currentMoment));
      for (const task of tasksForDay) tasks.push(task);
    }

    return tasks;
  }

  public addTask(task: Task) {
    const taskDay = this.getTaskDay(task);

    const existingTasks: Task[] = this.getTasksForTheSameDay(task);
    existingTasks.push(task);

    localStorage.setItem(taskDay, JSON.stringify(existingTasks));
  }

  public removeTask(task: Task) {
    const taskDay = this.getTaskDay(task);

    const newTasks = this.getTasksForTheSameDay(task).filter(
      (dayTask: Task) => !dayTask.createdAt.isSame(task.createdAt),
    );

    localStorage.setItem(taskDay, JSON.stringify(newTasks));
  }

  private fromLocalStorage(taskObj: any): Task {
    return {
      ...taskObj,
      beginAt: moment(taskObj.beginAt),
      createdAt: moment(taskObj.createdAt),
      updatedAt: taskObj.updatedAt ? moment(taskObj.updatedAt) : undefined,
    };
  }

  private getTaskDay(task: Task) {
    return task.beginAt.format('YYYY-MM-DD');
  }
}
