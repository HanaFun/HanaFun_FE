import { LessonCard } from '../molecules/LessonCard';

interface IProps {
  handleDetail: () => void;
}

export const LessonSlider = ({ handleDetail }: IProps) => {
  return (
    <div className='mt-5'>
      <LessonCard
        image='../images/mypage/sample_lessoncard.png'
        title='클래스명'
        category='베이킹'
        date='2024-06-25'
        handleClick={handleDetail}
      />
    </div>
  );
};
