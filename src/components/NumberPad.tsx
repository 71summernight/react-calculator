import { ERROR_MESSAGE, NUMBERS } from '@/constants/calculator';

type Props = {
  handleNumberClick: (number: string, onError: () => void) => void;
};

export default function NumberPad({ handleNumberClick }: Props) {
  return (
    <div className="digits flex">
      {NUMBERS.map((number) => (
        <button
          key={number}
          onClick={() =>
            handleNumberClick(number, () =>
              alert(ERROR_MESSAGE.OVER_MAX_NUMBER),
            )
          }
        >
          {number}
        </button>
      ))}
    </div>
  );
}
