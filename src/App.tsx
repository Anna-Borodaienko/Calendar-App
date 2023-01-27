import React, { useEffect, useState } from 'react';
import { MonthField } from './components/MonthField/MonthField';
import { Header } from './components/Header/Header';
import moment from 'moment';

function App() {
  const [month, setMonth] = useState(moment().month());

  useEffect(() => {
    if (month !== moment().month()) {
      localStorage.setItem('currentDate', `${month}`);
    }

    if (localStorage.getItem('currentDate')) {
      setMonth(+localStorage.getItem('currentDate')!);
    }
  }, []);

  return (
    <div>
      <Header month={month} setMonth={setMonth} />
      <MonthField month={month} />
    </div>
  );
}

export default App;
