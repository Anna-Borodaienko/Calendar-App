/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';

import { DayCard } from '../DayCard/DayCard';

import { Task } from '../../models/Task';
import { Grid } from '@mui/material/';
import { Month } from '../../models/Month';
import { Calendar as CalendarModel } from '../../models/Calendar';

interface Props {
  selectedMonth: Month;
  selectedMonthTasks: Task[];
  openTask: (item: Task) => void;
}

export const Calendar: React.FC<Props> = ({ openTask, selectedMonthTasks, selectedMonth }) => {
  const days = new CalendarModel(selectedMonth).days(selectedMonthTasks);
  return (
    <Grid container spacing={1} columns={7}>
      {days.map((week, weekIndex) => (
        <React.Fragment key={weekIndex}>
          {week.map(({ day, tasks }, dayIndex) => (
            <DayCard
              key={dayIndex}
              day={day}
              tasks={tasks}
              selectedMonth={selectedMonth}
              openTask={openTask}
            />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};
