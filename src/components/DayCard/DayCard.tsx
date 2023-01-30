/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { TasksList } from '../TasksList/TasksList';

import moment, { Moment } from 'moment';
import { Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { Task } from '../Models/Task';

interface Props {
  day: Moment;
  month: number;
  openTask: (item: Task) => void;
}

export const DayCard: React.FC<Props> = ({ day, month, openTask }) => {
  const [tasks, setTasks] = useState([]);
  const dayIsToday = day.format('dd MM DDDD') === moment().format('dd MM DDDD');
  const otherMonthDays = day.format('M') !== moment(new Date(day.year(), month)).format('M');
  const dayIsWeekend = day.format('dd') === 'Su' || day.format('dd') === 'Sa';

  useEffect(() => {
    if (localStorage.getItem(`${day.format('YYYY-MM-DD')}`)) {
      setTasks(JSON.parse(localStorage.getItem(`${day.format('YYYY-MM-DD')}`)!));
    }
  }, []);

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
          '& .MuiContainer': {
            padding: '0',
            margin: '0',
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
              {day.format('D')}
            </Typography>
            <Typography sx={{ color: dayIsWeekend ? 'rgba(212, 89, 121, 1)' : null }}>
              {day.format('dd')}
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
