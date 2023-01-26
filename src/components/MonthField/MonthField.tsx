import React from 'react';

import { DayCard } from '../DayCard/DayCard';

import styles from './MonthField.module.scss';
import { useDate } from '../../hooks/useDate';

export const MonthField: React.FC = () => {
  // const [currentDate] = useState<Date>(new Date());
  const DateMatrix = useDate();

  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth();
  // console.table(DateMatrix);

  // const dayInMonth = new Date(year, month, 0).getDate();

  return (
    <div className={styles.container}>
      {DateMatrix.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, index) => (
            <DayCard key={index} day={day} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

// <div className={styles.container}>
//   {[...Array(dayInMonth)].map((_item, i) => (
//     <DayCard item={i + 1} key={i} />
//   ))}
// </div>
