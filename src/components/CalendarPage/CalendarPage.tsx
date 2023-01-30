import React, { useEffect, useState } from 'react';
import { MonthField } from '../MonthField/MonthField';
import { Header } from '../Header/Header';
import moment, { Moment } from 'moment';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { Task } from '../../models/Task';
import { Day } from '../../models/Day';

export const CalendarPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<Day>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<any>({});
  const [activeMonthTasks, setActiveMonthTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (localStorage.getItem('selectedDay')) {
      setSelectedDay(JSON.parse(localStorage.getItem('selectedDay')!));
    }
  }, []);

  useEffect(() => {
    const startDay = moment(selectedDay).clone().startOf('month').startOf('isoWeek');
    const endDay = moment(selectedDay).clone().endOf('month').endOf('isoWeek');

    let date = startDay.clone().subtract(1, 'day');
    let tasks: Task[] = [];

    while (date.isBefore(endDay, 'day')) {
      for (let i = 0; i < 7; i++) {
        date = date.add(1, 'day');
        if (localStorage.getItem(`${date.format('YYYY-MM-DD')}`)) {
          const dayTasks = JSON.parse(localStorage.getItem(`${date.format('YYYY-MM-DD')}`)!);
          for (const day of dayTasks) {
            tasks.push(day);
          }
        }
      }
    }
    setActiveMonthTasks(tasks);
  }, [selectedDay]);

  const changeDate = (newDate: Moment) => {
    setSelectedDay(newDate);
    localStorage.setItem('selectedDay', `${newDate}`);
  };

  const addTask = (task: Task) => {
    if (!localStorage.getItem(`${task.beginAt}`)) {
      localStorage.setItem(`${task.beginAt}`, JSON.stringify(Array(task)));
      setIsOpen(false);
      return;
    }
    const tasks = JSON.parse(localStorage.getItem(`${task.beginAt}`)!);
    tasks.push(task);
    localStorage.setItem(`${task.beginAt}`, JSON.stringify(tasks));
    console.log(modalIsOpen);
    setIsOpen(false);
  };

  const openTask = (task: Task) => {
    setEditedTask(task);
    setIsOpen(true);
  };

  const editTask = (oldTask: Task, newTask: Task) => {
    openTask(oldTask);
    let dayTasks = JSON.parse(localStorage.getItem(`${oldTask.beginAt}`)!);

    dayTasks = dayTasks.filter((item: Task) => item.createdAt !== oldTask.createdAt);
    localStorage.setItem(`${oldTask.beginAt}`, JSON.stringify(dayTasks));

    if (!localStorage.getItem(`${newTask.beginAt}`)) {
      localStorage.setItem(`${newTask.beginAt}`, JSON.stringify(Array(newTask)));
      setIsOpen(false);
      return;
    }
    const anotherDayTasks = JSON.parse(localStorage.getItem(`${newTask.beginAt}`)!);

    anotherDayTasks.push(newTask);
    localStorage.setItem(`${newTask.beginAt}`, JSON.stringify(anotherDayTasks));

    setEditedTask({});
    setIsOpen(false);
  };

  const deleteTask = (task: Task) => {
    let dayTasks = JSON.parse(localStorage.getItem(`${task.beginAt}`)!);
    dayTasks = dayTasks.filter((item: Task) => item.createdAt !== task.createdAt);
    localStorage.setItem(`${task.beginAt}`, JSON.stringify(dayTasks));
    setEditedTask({});
    setIsOpen(false);
  };

  return (
    <div>
      <Header selectedDate={selectedDate} setDate={changeDate} setIsOpen={setIsOpen} />
      <MonthField
        selectedDay={selectedDay}
        openTask={openTask}
        activeMonthTasks={activeMonthTasks}
      />
      <ModalWindow
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        addTask={addTask}
        editedTask={editedTask}
        editTask={editTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};
