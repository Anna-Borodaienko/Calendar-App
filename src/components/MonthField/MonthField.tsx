/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { Moment } from 'moment';

import { DayCard } from '../DayCard/DayCard';

import { Task } from '../Models/Task';
import { Grid } from '@mui/material/';

interface Props {
  selectedDate: Moment;
  openTask: (item: Task) => void;
}

export const MonthField: React.FC<Props> = ({ selectedDate, openTask }) => {
  const getLayout = () => {
    const calendar = [];
    const startDay = selectedDate.clone().startOf('month').startOf('isoWeek');
    const endDay = selectedDate.clone().endOf('month').endOf('isoWeek');

    let date = startDay.clone().subtract(1, 'day');

    while (date.isBefore(endDay, 'day')) {
      const week = Array(7)
        .fill(0)
        .map(() => date.add(1, 'day').clone());
      calendar.push(week);
    }

    return calendar;
  };

  return (
    <Grid container spacing={1} columns={7}>
      {getLayout().map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, index) => (
            <DayCard key={index} day={day} month={selectedDate.month()} openTask={openTask} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};
