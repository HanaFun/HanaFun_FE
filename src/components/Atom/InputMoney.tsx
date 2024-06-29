import { FC, useEffect, useRef, useState } from 'react';
import { changeMoneyFormat } from '../../utils/changeMoney';

interface IProps {
  maxMoney: number;
  isChangeMoney: boolean;
  changeMoney?: (money: number) => void;
}

export const InputMoney: FC<IProps> = ({
  maxMoney,
  isChangeMoney,
  changeMoney,
}) => {
  const moneyInputRef = useRef<HTMLInputElement | null>(null);
  const [width, setWidth] = useState<number>(maxMoney.toLocaleString().length);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleChangeMoney = () => {
    if (moneyInputRef.current) {
      moneyInputRef.current.value = changeMoneyFormat(
        moneyInputRef.current.value
      );
      setWidth(
        moneyInputRef.current.value.length === 1
          ? 2
          : moneyInputRef.current.value.length
      );
      if (+moneyInputRef.current.value.replace(/[,]/gi, '') > maxMoney) {
        setShowMessage(true);
        return;
      }
      setShowMessage(false);
    }
  };

  return (
    <div className='mt-36 flex flex-col items-center justify-center font-hanaMedium text-2xl gap-2'>
      <p>
        <input
          ref={moneyInputRef}
          type='text'
          maxLength={11}
          defaultValue={maxMoney.toLocaleString()}
          disabled={!isChangeMoney}
          onChange={handleChangeMoney}
          className='border-none bg-transparent text-end pr-2 focus:outline-none'
          style={{ width: width + 'rem' }}
        />
        원
      </p>
      {showMessage && (
        <p className='font-hanaLight text-xs text-hanaRed'>
          출금 가능 금액이 부족합니다.
        </p>
      )}
    </div>
  );
};
