import { LessonSalesTotal } from '../molecules/LessonSalesTotal';

interface IProps {
  data: MonthSalesType[] | undefined;
}

export const LessonSalesList = ({ data }: IProps) => {
  return (
    <div className='mt-4 px-7 overflow-y-scroll scrollbar-hide'>
      <LessonSalesTotal title='클래스 1' lessonTotal={520000} />
      <LessonSalesTotal title='클래스 2' lessonTotal={70000} />
      <LessonSalesTotal title='클래스 3 ' lessonTotal={120000} />
    </div>
  );
};
