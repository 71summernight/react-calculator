import { ERROR_MESSAGE, OPERATORS, OperatorType } from '@/constants/calculator';

type Props = {
  handleOperatorClick: (operator: OperatorType, onError: () => void) => void;
  getCalculateResult: () => void;
};

export default function Operators({
  handleOperatorClick,
  getCalculateResult,
}: Props) {
  return (
    <div className="operations subgrid">
      {OPERATORS.map((operator) => (
        <button
          key={operator}
          onClick={() =>
            handleOperatorClick(operator, () =>
              alert(ERROR_MESSAGE.OPERATOR_ORDER_ERROR),
            )
          }
        >
          {operator}
        </button>
      ))}
      <button onClick={getCalculateResult}>=</button>
    </div>
  );
}
