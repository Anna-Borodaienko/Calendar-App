import React from 'react';
import cn from 'classnames';

import styles from './DayCard.module.scss';
import moment from 'moment';

interface Props {
  day: any;
}

export const DayCard: React.FC<Props> = ({ day }) => {
  const dayIsToday = day.format('dd MM DDDD') === moment().format('dd MM DDDD');
  const otherMonthDays = day.format('MM') !== moment().format('MM');

  return (
    <div
      className={cn(styles.card, {
        [styles.card_active]: dayIsToday,
        [styles.card_other]: otherMonthDays,
      })}
    >
      <p className={styles.info}>{day.format('D')}</p>
      <p className={styles.info}>{day.format('dd')}</p>
    </div>
  );
};
