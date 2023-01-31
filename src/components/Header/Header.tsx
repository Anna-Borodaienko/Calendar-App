/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import CircumIcon from '@klarr-agency/circum-icons-react';
import DatePicker from 'react-date-picker';

import styles from './Header.module.scss';
import { Month } from '../../models/Month';

interface Props {
  selectedMonth: Month;
  selectNewMonth: (month: Month) => void;
  openModal: () => void;
}

export const Header: React.FC<Props> = ({ selectedMonth, selectNewMonth, openModal }) => {
  const forwardMonth = () => {
    selectNewMonth(selectedMonth.increment());
  };

  const backwardMonth = () => {
    selectNewMonth(selectedMonth.decrement());
  };

  const selectDate = (newDate: Date) => {
    selectNewMonth(Month.fromDate(newDate));
  };

  return (
    <header className={styles.container}>
      <button className={styles.arrow} onClick={openModal}>
        <CircumIcon name="square_plus" color="#000" size="40px"></CircumIcon>
      </button>

      <div className={styles.date}>
        <div className={styles.month}>
          <button className={styles.arrow} onClick={backwardMonth}>
            <CircumIcon name="square_chev_left" color="#000" size="40px"></CircumIcon>
          </button>
          <div>{selectedMonth.format('MMMM YYYY')}</div>
          <button className={styles.arrow} onClick={forwardMonth}>
            <CircumIcon name="square_chev_right" color="#000" size="40px"></CircumIcon>
          </button>
        </div>

        <DatePicker
          calendarIcon={<CircumIcon name="calendar_date" color="#000" size="58px"></CircumIcon>}
          clearIcon={null}
          calendarAriaLabel={'Calendar'}
          locale={'en-EN'}
          maxDetail={'year'}
          onChange={selectDate}
          returnValue={'end'}
          format={'y-MM'}
          defaultActiveStartDate={new Date(selectedMonth.year, selectedMonth.month, 1)}
        />
      </div>
    </header>
  );
};
