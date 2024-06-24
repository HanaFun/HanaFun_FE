import { FC } from 'react';

interface IProps {
  message: string;
  onClick: () => void;
}

export const Button: FC<IProps> = ({ message, onClick }) => {
  return (
    <div className='absolute w-full flex justify-center bottom-6'>
      <button
        className='w-[90%] bg-hanaNavGreen rounded-2xl py-4 text-xl font-hanaBold text-white'
        onClick={onClick}
      >
        {message}
      </button>
    </div>
  );
};
