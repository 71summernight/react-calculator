import React from 'react';

import AllClear from './components/AllClear';
import Display from './components/Display';
import NumberPad from './components/NumberPad';
import Operators from './components/Operators';
import useCalculator from './hooks/useCalculator';
import { ERROR_MESSAGE } from './constants/calculator';

export default function App() {
  const {
    appendNumber,
    handleOperatorSelect,
    getCalculateResult,
    resetCalculator,
    view,
  } = useCalculator();

  return (
    <div className="calculator">
      <Display view={view} />
      <NumberPad handleNumberClick={view === ERROR_MESSAGE.INFINITY_RESULT_ERROR ? ()=>{} : appendNumber} />
      <AllClear resetCalculator={resetCalculator} />
      <Operators
        handleOperatorClick={handleOperatorSelect}
        getCalculateResult={getCalculateResult}
      />
    </div>
  );
}
