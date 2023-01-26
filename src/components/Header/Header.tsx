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
  const [pickerIsOpen, setPickerIsOpen] = useState(true);
  const [pickerValue, setPickerValue] = useState(new Date());

  const currentDate = moment(new Date(moment().year(), month, 1));
  const difference = currentDate.diff(pickerValue, 'months');

  useEffect(() => {
    setMonth(month - difference);
  }, [difference]);

  const handlePickerChange = (value: Date) => {
    setPickerValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.month}>
        <button className={styles.arrow} onClick={() => setMonth(month - 1)}>
          <CircumIcon name="square_chev_left" color="#000" size="40px"></CircumIcon>
        </button>
        <div>{currentDate.format('MMMM YYYY')}</div>
        <button className={styles.arrow} onClick={() => setMonth(month + 1)}>
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
      />
    </div>
  );
};
