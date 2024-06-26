import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { LessonSlider } from '../../components/organisms/LessonSlider';
import moment from 'moment';

export const MyLessonList = () => {
  const navigate = useNavigate();

  const { data: allLessons } = useQuery({
    queryKey: ['allLessons'],
    queryFn: async () => {
      const response = await ApiClient.getMyLessonAll();
      return response;
    },
  });

  const today = moment().format('YYYY-MM-DD');
  const prevLesson =
    allLessons?.filter((lesson) => moment(lesson.date).isBefore(today)) || [];
  const todayLesson =
    allLessons?.filter((lesson) => moment(lesson.date).isSame(today)) || [];
  const nextLesson =
    allLessons?.filter((lesson) => moment(lesson.date).isAfter(today)) || [];

  console.log('prev: ', prevLesson);
  console.log('today: ', todayLesson);
  console.log('next: ', nextLesson);

  return (
    <div className='font-hanaMedium'>
      <Topbar title='신청 클래스' onClick={() => navigate('/mypage')} />
      <div className='mt-6 ml-5'>
        <div>
          <p>오늘의 클래스</p>
          <LessonSlider data={todayLesson} />
        </div>
        <div className='mt-5'>
          <p>나의 예약 클래스</p>
          <LessonSlider data={nextLesson} />
        </div>
        <div className='mt-5'>
          <p>수강한 클래스</p>
          <LessonSlider data={prevLesson} />
        </div>
      </div>
    </div>
  );
};
