import moment from 'moment';
import { useState } from 'react';

export const useDate = (year = moment().year(), month = moment().month()) => {
  const firstDayOfMonth = moment(new Date(year, month, 0)).day();
  let currentMonthCount = 0 - firstDayOfMonth;

  const matrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return moment(new Date(year, month, currentMonthCount));
    });
  });

  const [DayMatrix] = useState(matrix);

  return DayMatrix;
};
