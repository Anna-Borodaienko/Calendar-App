/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import CircumIcon from '@klarr-agency/circum-icons-react';
import DatePicker from 'react-date-picker';

import styles from './Header.module.scss';
import moment, { Moment } from 'moment';

interface Props {
  selectedDate: Moment;
  setDate: (date: Moment) => void;
  setIsOpen: (value: boolean) => void;
}

export const Header: React.FC<Props> = ({ selectedDate, setDate, setIsOpen }) => {
  const forwardMonth = () => {
    setDate(selectedDate.clone().add(1, 'M'));
  };

  const backwardMonth = () => {
    setDate(selectedDate.clone().subtract(1, 'M'));
  };

  const selectDate = (newDate: Date) => {
    setDate(moment(newDate));
  };

  const openModal = () => {
    setIsOpen(true);
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
          <div>{selectedDate.format('MMMM YYYY')}</div>
          <button className={styles.arrow} onClick={() => forwardMonth()}>
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
          defaultActiveStartDate={new Date(selectedDate.year(), selectedDate.month(), 1)}
        />
      </div>
    </header>
  );
};
