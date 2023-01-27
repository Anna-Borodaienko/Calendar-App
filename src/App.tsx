import React, { useEffect, useState } from 'react';
import { MonthField } from './components/MonthField/MonthField';
import { Header } from './components/Header/Header';
import moment from 'moment';
import { ModalWindow } from './components/ModalWindow/ModalWindow';

function App() {
  const [month, setMonth] = useState(moment().month());
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('currentMonth')) {
      setMonth(+localStorage.getItem('currentMonth')!);
    }
  }, []);

  return (
    <div>
      <Header month={month} setMonth={setMonth} setIsOpen={setIsOpen} />
      <MonthField month={month} />
      <ModalWindow modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default App;
