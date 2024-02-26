import { useCallback, useState } from 'react';

import { ERROR_MESSAGE, MAX_NUM, OperatorType } from '../constants/calculator';

const calculate = (num1: number, num2: number, op: OperatorType) => {
  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'X':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : ERROR_MESSAGE.INFINITY_RESULT_ERROR;
    default:
      return 0;
  }
};

export default function useCalculator() {
  const [firstNum, setFirstNum] = useState(0);
  const [operator, setOperator] = useState<OperatorType | ''>('');
  const [view, setView] = useState('0');

  const appendNumber = useCallback(
    (clickedNum: string, onError: ()=> void) => {
      const isViewEmpty = view === '0';
      const isOperationInvalid = operator && !firstNum;
      const shouldUpdateViewWithClickedNum = isViewEmpty || isOperationInvalid;
      const viewNumber = shouldUpdateViewWithClickedNum
        ? clickedNum
        : view + clickedNum;

      if (Number(viewNumber) > MAX_NUM) {
        onError()
      }
      setView(viewNumber);
      if (!operator) {
        setFirstNum(Number(viewNumber));
      }
    },
    [view, operator, firstNum],
  );

  const handleOperatorSelect = useCallback(
    (selectedOperator: OperatorType, onError: () => void) => {
      if (operator) {
        onError();
        return;
      }
      setOperator(selectedOperator);
      setView(firstNum + selectedOperator);
    },
    [operator, view],
  );

  const getCalculateResult = useCallback(() => {
    if (!firstNum || !operator) {
      return;
    }
    const secondNum = Number(view.match(/(-?\d+)([+\-*/])(-?\d+)/)?.[3]);
    const result = calculate(firstNum, secondNum, operator);
    if (typeof result === 'number') {
      const truncatedResult = Math.trunc(result);
      setFirstNum(truncatedResult);
      setOperator('');
      setView(truncatedResult.toString());
    } else {
      setView(ERROR_MESSAGE.INFINITY_RESULT_ERROR);
    }
  }, [firstNum, operator, view]);

  const resetCalculator = useCallback(() => {
    setFirstNum(0);
    setOperator('');
    setView('0');
  }, []);

  return {
    appendNumber,
    handleOperatorSelect,
    getCalculateResult,
    resetCalculator,
    view,
  };
}
