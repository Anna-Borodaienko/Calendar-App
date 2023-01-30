/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { TasksList } from '../TasksList/TasksList';

import styles from './DayCard.module.scss';
import moment, { Moment } from 'moment';
import { Card, CardActionArea, CardContent, Typography, List, Container } from '@mui/material';
import { Task } from '../Models/Task';

interface Props {
  day: any;
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
    <Card
      className={cn(styles.card, {
        [styles.card_active]: dayIsToday,
        [styles.card_other]: otherMonthDays,
      })}
      sx={{
        height: '250px',
        width: '200px',
        border: '1px solid rgba(109, 88, 212, 0.8)',
        transition: 'all 500ms',
      }}
    >
      <CardContent>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Typography className={cn(styles.info, { [styles.info_weekend]: dayIsWeekend })}>
            {day.format('D')}
          </Typography>
          <Typography className={cn(styles.info, { [styles.info_weekend]: dayIsWeekend })}>
            {day.format('dd')}
          </Typography>
        </Container>
        <Container sx={{ padding: 0 }}>
          {tasks && <TasksList tasks={tasks} openTask={openTask} />}
        </Container>
      </CardContent>
    </Card>
  );
};
