import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { MyCalendar } from '../../components/molecules/MyCalendar';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { useEffect, useState } from 'react';
import { LessonDetail } from '../../components/molecules/LessonDetail';
import { LessonList } from '../../components/molecules/LessonList';
import { Loading } from '../Loading';
import { ErrorPage } from '../ErrorPage';

export const LessonCalendar = () => {
  const navigate = useNavigate();

  const [selectedLesson, setSelectedLesson] = useState<LessonType[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarDataType[]>([]);

  // 나의 신청 클래스 api 호출
  const {
    data: allLessons,
    isLoading: isLoadingLessons,
    error: errorLessons,
  } = useQuery({
    queryKey: ['allLessons'],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getMyLessonAll();
      return response.data;
    },
    retry: 1,
  });

  // lesson 상세 정보 api 호출
  const {
    data: selectedLessonDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
  } = useQuery({
    queryKey: ['lessonDetails', selectedLessonId],
    queryFn: async () => {
      if (selectedLessonId === null) return null;
      const response =
        await ApiClient.getInstance().getLessonDetail(selectedLessonId);
      return response;
    },
    enabled: selectedLessonId !== null,
  });

  useEffect(() => {
    if (allLessons) {
      const formattedData = allLessons.map((lesson: LessonType) => ({
        lesson_id: lesson.lesson_id,
        date: lesson.date,
      }));
      setCalendarData(formattedData);
    }
  }, [allLessons]);

  if (isLoadingLessons || isLoadingDetail) {
    return <Loading />;
  }

  if (errorLessons || errorDetail) {
    return <ErrorPage />;
  }

  return (
    <div>
      <Topbar title='신청 클래스 일정' onClick={() => navigate('/mypage')} />
      <MyCalendar
        data={calendarData || []}
        setSelectedLesson={(lessons: CalendarDataType[]) => {
          const selectedLessons = allLessons?.filter((lesson: LessonType) =>
            lessons.some(
              (selectedLesson) => selectedLesson.lesson_id === lesson.lesson_id
            )
          );
          setSelectedLesson(selectedLessons || []);
        }}
      />
      <div className='m-5'>
        <p className='font-hanaMedium text-xl ml-1'>나의 일정 모아보기</p>
        <LessonList
          selectedLesson={selectedLesson}
          handleLessonDetail={(lesson_id: number) =>
            setSelectedLessonId(lesson_id)
          }
        />
        <p className='font-hanaMedium text-xl mt-5 ml-1'>클래스 상세 정보</p>
        {isLoadingDetail ? (
          <Loading />
        ) : errorDetail ? (
          <ErrorPage />
        ) : (
          <LessonDetail lessonDetail={selectedLessonDetail} />
        )}
      </div>
    </div>
  );
};

export default LessonCalendar;
