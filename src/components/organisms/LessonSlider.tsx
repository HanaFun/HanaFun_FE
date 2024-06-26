import { useState, useEffect } from 'react';
import { LessonCard } from '../molecules/LessonCard';
import DropdownSingle from '../common/DropdownSingle';
import DropdownDouble from '../common/DropdownDouble';
import { useNavigate } from 'react-router-dom';

interface IProps {
  data: Array<LessonType> | undefined;
  show: boolean;
  option: string;
}

export const LessonSlider = ({ data, show, option }: IProps) => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleModalOpen = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const handleDelete = (reservation_id: number) => {
    // 모달 열고, 확인 버튼 누르면 reservation_id 넘겨주기
    console.log(reservation_id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.lesson-card') && activeCard !== null) {
        setActiveCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeCard]);

  return (
    <div className='mt-5 pb-1 overflow-x-scroll whitespace-nowrap scrollbar-hide'>
      {data?.map((myLesson, index) => (
        <div key={myLesson.lesson_id} className='inline-block relative'>
          <div className='lesson-card'>
            <LessonCard
              image={myLesson.image}
              title={myLesson.title}
              category={myLesson.location}
              date={myLesson.date}
              show={show}
              handleClick={() => handleModalOpen(index)}
            />
          </div>
          {activeCard === index && (
            <div className='absolute top-0 right-0 mr-4 flex justify-center items-center'>
              {option === 'single' && (
                <DropdownSingle
                  image='/images/mypage/dropdown_img.svg'
                  text='신고하기'
                  handleClick={() => navigate('/mypage')}
                />
              )}
              {option === 'double' && (
                <DropdownDouble
                  image1='/images/mypage/dropdown_trash.svg'
                  image2='/images/mypage/dropdown_img.svg'
                  text1='예약취소'
                  text2='신고하기'
                  handleClick1={() => handleDelete(myLesson.reservation_id)}
                  handleClick2={() => navigate('/mypage')}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
