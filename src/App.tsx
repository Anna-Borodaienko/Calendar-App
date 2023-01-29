import React, { useEffect, useState } from 'react';
import { MonthField } from './components/MonthField/MonthField';
import { Header } from './components/Header/Header';
import moment, { Moment } from 'moment';
import { ModalWindow } from './components/ModalWindow/ModalWindow';

function App() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('selectedDate')) {
      setSelectedDate(moment(localStorage.getItem('selectedDate')));
    }
  }, []);

  const changeDate = (newDate: Moment) => {
    setSelectedDate(newDate);
    if (newDate.month() !== moment().month()) {
      localStorage.setItem('selectedDate', `${newDate}`);
    }
  };

  return (
    <div>
      <Header selectedDate={selectedDate} setDate={changeDate} setIsOpen={setIsOpen} />
      <MonthField selectedDate={selectedDate} />
      <ModalWindow modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default App;
