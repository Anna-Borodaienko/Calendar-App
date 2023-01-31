import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { Task } from '../../models/Task';
import { TasksLocalStorage } from '../../services/TasksLocalStorage';
import { Month } from '../../models/Month';
import { Calendar as CalendarModel } from '../../models/Calendar';
import { SelectedMonthLocalStorage } from '../../services/SelectedMonthLocalStorage';
import { Calendar } from '../Calendar/Calendar';

export const CalendarPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<Month>(Month.now());
  const [selectedMonthTasks, setSelectedMonthTasks] = useState<Task[]>([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<any>({});

  const tasksStorage = new TasksLocalStorage();
  const selectedMonthStorage = new SelectedMonthLocalStorage();

  useEffect(() => {
    if (selectedMonthStorage.hasSelectedMonth()) {
      setSelectedMonth(selectedMonthStorage.getSelectedMonth());
    }
  }, []);

  useEffect(() => {
    const calendar = new CalendarModel(selectedMonth);

    const monthTasks = tasksStorage.getTasksByDateRange(calendar.firstDay(), calendar.lastDay());

    setSelectedMonthTasks(monthTasks);
  }, [selectedMonth, modalIsOpen]);

  const selectNewMonth = (newMonth: Month) => {
    setSelectedMonth(newMonth);
    selectedMonthStorage.setSelectedMonth(newMonth);
  };

  const addTask = (task: Task) => {
    tasksStorage.addTask(task);
    setIsOpen(false);
  };

  const openTask = (task: Task) => {
    setEditedTask(task);
    setIsOpen(true);
  };

  const editTask = (oldTask: Task, newTask: Task) => {
    tasksStorage.removeTask(oldTask);
    tasksStorage.addTask(newTask);
    setEditedTask({});
    setIsOpen(false);
  };

  const deleteTask = (task: Task) => {
    tasksStorage.removeTask(task);
    setEditedTask({});
    setIsOpen(false);
  };

  return (
    <div>
      <Header
        selectedMonth={selectedMonth}
        selectNewMonth={selectNewMonth}
        openModal={() => setIsOpen(true)}
      />
      <Calendar
        selectedMonth={selectedMonth}
        selectedMonthTasks={selectedMonthTasks}
        openTask={openTask}
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
