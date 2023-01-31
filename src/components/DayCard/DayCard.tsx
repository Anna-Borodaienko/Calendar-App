/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { TasksList } from '../TasksList/TasksList';

import { Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { Task } from '../../models/Task';
import { Day } from '../../models/Day';
import { Month } from '../../models/Month';

interface Props {
  day: Day;
  tasks: Task[];
  selectedMonth: Month;
  openTask: (item: Task) => void;
}

export const DayCard: React.FC<Props> = ({ day, tasks, selectedMonth, openTask }) => {
  const dayIsToday = day.equals(Day.now());
  const dayFromOtherMonth = day.month !== selectedMonth.month;
  const dayIsWeekend = day.isWeekend();

  return (
    <Grid item xs={1}>
      <Card
        sx={{
          height: '200px',
          overflow: 'auto',
          border: '1px solid rgba(109, 88, 212, 0.8)',
          transition: 'all 500ms',
          backgroundColor: dayIsToday ? 'rgba(109, 88, 212, 0.4)' : null,
          opacity: dayFromOtherMonth ? '0.3' : null,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
          },
        }}
      >
        <CardContent>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ color: dayIsWeekend ? 'rgba(212, 89, 121, 1)' : null }}>
              {day.day}
            </Typography>
            <Typography sx={{ color: dayIsWeekend ? 'rgba(212, 89, 121, 1)' : null }}>
              {day.dayOfWeek()}
            </Typography>
          </Container>
          <Container sx={{ marginTop: '20px', color: 'rgba(109, 88, 212, 1)' }}>
            {tasks.length > 0 && <TasksList tasks={tasks} openTask={openTask} />}
          </Container>
        </CardContent>
      </Card>
    </Grid>
  );
};
