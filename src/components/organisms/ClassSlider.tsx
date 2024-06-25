import { ClassCard } from '../molecules/ClassCard';

interface IProps {
  handleDetail: () => void;
}

export const ClassSlider = ({ handleDetail }: IProps) => {
  return (
    <div className='mt-5'>
      <ClassCard
        image='../images/mypage/sample_classcard.png'
        title='클래스명'
        category='베이킹'
        date='2024-06-25'
        handleClick={handleDetail}
      />
    </div>
  );
};
