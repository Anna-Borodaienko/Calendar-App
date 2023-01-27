/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import CircumIcon from '@klarr-agency/circum-icons-react';
import DatePicker from 'react-date-picker';

import styles from './Header.module.scss';
import moment from 'moment';

interface Props {
  month: number;
  setMonth: (month: number) => void;
}

export const Header: React.FC<Props> = ({ month, setMonth }) => {
  const [pickerValue, setPickerValue] = useState(moment(new Date(moment().year(), month, 1)));
  console.log(month);

  const currentDate = moment(new Date(moment().year(), month, 1));
  console.log(currentDate);

  const difference = currentDate.diff(
    moment(new Date(moment(pickerValue).year(), moment(pickerValue).month(), 1)),
    'months',
  );

  useEffect(() => {
    setMonth(month - difference);
  }, [pickerValue]);

  useEffect(() => {
    if (month !== 0) {
      localStorage.setItem('currentDate', `${month}`);
    }
  }, [month]);

  console.log(month);

  const handleForwardOnMonth = () => {
    setMonth(month + 1);
  };

  const handleBackOnMonth = () => {
    setMonth(month - 1);
  };

  const handlePickerChange = (value: Date) => {
    setPickerValue(moment(new Date(moment(value).year(), moment(value).month(), 1)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.month}>
        <button className={styles.arrow} onClick={handleBackOnMonth}>
          <CircumIcon name="square_chev_left" color="#000" size="40px"></CircumIcon>
        </button>
        <div>{currentDate.format('MMMM YYYY')}</div>
        <button className={styles.arrow} onClick={() => handleForwardOnMonth()}>
          <CircumIcon name="square_chev_right" color="#000" size="40px"></CircumIcon>
        </button>
      </div>

      <DatePicker
        calendarIcon={<CircumIcon name="calendar_date" color="#000" size="58px"></CircumIcon>}
        clearIcon={null}
        calendarAriaLabel={'Calendar'}
        locale={'en-EN'}
        maxDetail={'year'}
        onChange={handlePickerChange}
        returnValue={'end'}
        format={'y-MM'}
      />
    </div>
  );
};
