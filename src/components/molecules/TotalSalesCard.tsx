import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { LessonSalesList } from '../organisms/LessonSalesList';

interface Iprops {
  year: number;
  month: number;
  data: MonthSalesType[] | undefined;
}

export const TotalSalesCard = ({ year, month, data }: Iprops) => {
  const monthTotal =
    data?.reduce((total, item) => total + item.revenue, 0) || 0;

  return (
    <div className='w-[351px] h-[476px] mt-5 shadow-md rounded-lg text-center bg-white font-hanaMedium'>
      {/* navigate */}
      <div className='flex flex-row justify-center mt-5'>
        <GrFormPrevious className='mt-1 mr-20 cursor-pointer' />
        <p>
          {year}년 {month}월 매출액
        </p>
        <GrFormNext className='mt-1 ml-20 cursor-pointer' />
      </div>

      {/* month total */}
      <p className='text-xl mt-6'>{monthTotal} 원</p>

      <LessonSalesList data={data} />
    </div>
  );
};
