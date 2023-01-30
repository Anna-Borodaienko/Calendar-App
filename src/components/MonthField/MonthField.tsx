/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { Moment } from 'moment';

import { DayCard } from '../DayCard/DayCard';

import { Task } from '../../models/Task';
import { Day } from '../../models/Day';
import { Grid } from '@mui/material/';
import moment from 'moment';

interface Props {
  selectedDay: Day;
  activeMonthTasks: Task[];
  openTask: (item: Task) => void;
}

export const MonthField: React.FC<Props> = ({ selectedDay, openTask, activeMonthTasks }) => {
  const getLayout = (): Day[][] => {
    const calendar = [];
    const startDay = moment(selectedDay).clone().startOf('month').startOf('isoWeek');
    const endDay = moment(selectedDay).clone().endOf('month').endOf('isoWeek');

    console.log(startDay, endDay);

    let date = startDay.clone().subtract(1, 'day');

    while (date.isBefore(endDay, 'day')) {
      const week = Array(7)
        .fill(0)
        .map(() => {
          date = date.add(1, 'day').clone();
          // if (activeMonthTasks.length > 0) {
          //   console.log(moment(activeMonthTasks[0].date), 'wwwww', date);
          // }
          return {
            year: date.year(),
            month: date.month(),
            day: date.day(),
            tasks: activeMonthTasks.filter((task) => moment(task.beginAt) === date),
          };
        });
      calendar.push(week);
    }

    return calendar;
  };

  return (
    <Grid container spacing={1} columns={7}>
      {getLayout().map((week, i) => (
        <React.Fragment key={i}>
          {week.map((day, index) => (
            <DayCard key={index} day={day} month={selectedDay.month} openTask={openTask} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};
