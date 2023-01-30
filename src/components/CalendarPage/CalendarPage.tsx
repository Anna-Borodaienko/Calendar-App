import React, { useEffect, useState } from 'react';
import { MonthField } from '../MonthField/MonthField';
import { Header } from '../Header/Header';
import moment, { Moment } from 'moment';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { Task } from '../Models/Task';

export const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<any>({});

  useEffect(() => {
    if (localStorage.getItem('selectedDate')) {
      setSelectedDate(moment(localStorage.getItem('selectedDate')));
    }
  }, []);

  const changeDate = (newDate: Moment) => {
    setSelectedDate(newDate);
    localStorage.setItem('selectedDate', `${newDate}`);
  };

  const addTask = (values: Task) => {
    const task = {
      title: values.title,
      description: values.description || '',
      date: values.date,
      beginTime: values.beginTime || '00:00',
      createdAt: moment(),
    };
    if (!localStorage.getItem(`${task.date}`)) {
      localStorage.setItem(`${task.date}`, JSON.stringify(Array(task)));
      setIsOpen(false);
      return;
    }
    const tasks = JSON.parse(localStorage.getItem(`${task.date}`)!);
    tasks.push(task);
    localStorage.setItem(`${task.date}`, JSON.stringify(tasks));
    console.log(modalIsOpen);
    setIsOpen(false);
  };

  const openTask = (task: Task) => {
    setEditedTask(task);
    setIsOpen(true);
  };

  const editTask = (task: Task, values: Task) => {
    openTask(task);
    let dayTasks = JSON.parse(localStorage.getItem(`${task.date}`)!);

    dayTasks = dayTasks.filter((item: Task) => item.createdAt !== task.createdAt);
    localStorage.setItem(`${task.date}`, JSON.stringify(dayTasks));

    const updatedTask = {
      ...values,
      updatedAt: moment(),
    };

    if (!localStorage.getItem(`${updatedTask.date}`)) {
      localStorage.setItem(`${updatedTask.date}`, JSON.stringify(Array(updatedTask)));
      setIsOpen(false);
      return;
    }
    const anotherDayTasks = JSON.parse(localStorage.getItem(`${updatedTask.date}`)!);

    anotherDayTasks.push(updatedTask);
    localStorage.setItem(`${updatedTask.date}`, JSON.stringify(anotherDayTasks));

    setEditedTask({});
    setIsOpen(false);
  };

  const deleteTask = (task: Task) => {
    let dayTasks = JSON.parse(localStorage.getItem(`${task.date}`)!);
    dayTasks = dayTasks.filter((item: Task) => item.createdAt !== task.createdAt);
    localStorage.setItem(`${task.date}`, JSON.stringify(dayTasks));
    setEditedTask({});
    setIsOpen(false);
  };

  return (
    <div>
      <Header selectedDate={selectedDate} setDate={changeDate} setIsOpen={setIsOpen} />
      <MonthField selectedDate={selectedDate} openTask={openTask} />
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
