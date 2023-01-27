import React from 'react';
import cn from 'classnames';

import styles from './DayCard.module.scss';
import moment from 'moment';

interface Props {
  day: any;
  month: number;
}

export const DayCard: React.FC<Props> = ({ day, month }) => {
  const dayIsToday = day.format('dd MM DDDD') === moment().format('dd MM DDDD');
  const otherMonthDays = day.format('M') !== moment(new Date(day.year(), month)).format('M');

  const dayIsWeekend = day.format('dd') === 'Su' || day.format('dd') === 'Sa';

  return (
    <div
      className={cn(styles.card, {
        [styles.card_active]: dayIsToday,
        [styles.card_other]: otherMonthDays,
      })}
    >
      <p className={cn(styles.info, { [styles.info_weekend]: dayIsWeekend })}>{day.format('D')}</p>
      <p className={cn(styles.info, { [styles.info_weekend]: dayIsWeekend })}>{day.format('dd')}</p>
    </div>
  );
};
