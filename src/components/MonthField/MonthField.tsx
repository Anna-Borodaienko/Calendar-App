import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { DayCard } from '../DayCard/DayCard';

import styles from './MonthField.module.scss';

interface Props {
  month: number;
}

export const MonthField: React.FC<Props> = ({ month }) => {
  const setLayout = (month = moment().month()) => {
    const year = moment().year();
    const firstDayOfMonth = moment(new Date(year, month, 0)).day();
    let currentMonthCount = 0 - firstDayOfMonth;

    const matrix = new Array(6).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return moment(new Date(year, month, currentMonthCount));
      });
    });

    return matrix;
  };

  const [Days, setDays] = useState(setLayout(month));

  useEffect(() => {
    setDays(setLayout(month));
  }, [month]);

  return (
    <div className={styles.container}>
      {Days.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, index) => (
            <DayCard key={index} day={day} month={month} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
