import React from 'react';
import { Moment } from 'moment';

import { DayCard } from '../DayCard/DayCard';

import styles from './MonthField.module.scss';

interface Props {
  selectedDate: Moment;
}

export const MonthField: React.FC<Props> = ({ selectedDate }) => {
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
    <div className={styles.container}>
      {getLayout().map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, index) => (
            <DayCard key={index} day={day} month={selectedDate.month()} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
