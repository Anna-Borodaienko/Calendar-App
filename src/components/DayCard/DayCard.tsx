/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { TasksList } from '../TasksList/TasksList';

import moment, { Moment } from 'moment';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { Task } from '../../models/Task';
import { Day } from '../../models/Day';

interface Props {
  day: Day;
  openTask: (item: Task) => void;
}

export const DayCard: React.FC<Props> = ({ day: dayProps, openTask }) => {
  const { year, month, day, tasks } = dayProps;

  // const [tasks, setTasks] = useState([]);
  const currentDay = moment(dayProps);
  const dayIsToday = currentDay.format('dd MM DDDD') === moment().format('dd MM DDDD');
  const otherMonthDays = currentDay.format('M') !== moment(new Date(year, month)).format('M');
  const dayIsWeekend = currentDay.format('dd') === 'Su' || currentDay.format('dd') === 'Sa';

  return (
    <Grid item xs={1}>
      <Card
        sx={{
          height: '200px',
          overflow: 'auto',
          border: '1px solid rgba(109, 88, 212, 0.8)',
          transition: 'all 500ms',
          backgroundColor: dayIsToday ? 'rgba(109, 88, 212, 0.4)' : null,
          opacity: otherMonthDays ? '0.3' : null,
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
              {currentDay.format('D')}
            </Typography>
            <Typography sx={{ color: dayIsWeekend ? 'rgba(212, 89, 121, 1)' : null }}>
              {currentDay.format('dd')}
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
