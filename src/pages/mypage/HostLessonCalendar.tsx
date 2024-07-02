import { useNavigate, useParams } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { MyCalendar } from '../../components/molecules/MyCalendar';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { LessonList } from '../../components/molecules/LessonList';
import { LessonDetail } from '../../components/molecules/LessonDetail';
import { ApplicantList } from '../../components/organisms/ApplicantList';

export const HostLessonCalendar = () => {
  const navigate = useNavigate();
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const [selectedLesson, setSelectedLesson] = useState<HostLessonDetailType[]>(
    []
  );
  const [calendarData, setCalendarData] = useState<CalendarDataType[]>([]);

  // 개설 클래스 상세 api
  const { data: hostLessonDetail } = useQuery({
    queryKey: ['hostLessonDetail', lesson_id],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getHostLessonDetailList(
        Number(lesson_id)
      );
      return response;
    },
  });
  console.log('클래스의 일정은 : ', hostLessonDetail?.data);

  // 클래스 상세 api
  const { data: lessonDetail } = useQuery({
    queryKey: ['lessonDetail', lesson_id],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getLessonDetail(
        Number(lesson_id)
      );
      return response;
    },
  });

  useEffect(() => {
    if (hostLessonDetail?.data) {
      const formattedData = hostLessonDetail.data.map(
        (lesson: HostLessonDetailType) => ({
          lesson_id: lesson.lesson_id,
          date: lesson.date,
        })
      );
      setCalendarData(formattedData);
    }
  }, [hostLessonDetail]);

  useEffect(() => {
    if (lesson_id && hostLessonDetail?.data) {
      const selectedLessonDetail = hostLessonDetail.data.find(
        (lesson: HostLessonDetailType) => lesson.lesson_id === Number(lesson_id)
      );
      if (selectedLessonDetail) {
        setSelectedLesson([selectedLessonDetail]);
      }
    }
  }, [lesson_id, hostLessonDetail]);

  const handleLessonDetail = (lesson_id: number) => {
    const selectedLessonDetail = hostLessonDetail?.data?.find(
      (lesson: HostLessonDetailType) => lesson.lesson_id === lesson_id
    );
    if (selectedLessonDetail) {
      setSelectedLesson([selectedLessonDetail]);
    }
  };

  const setUniqueSelectedLessons = (lessons: CalendarDataType[]) => {
    const selectedLessons = hostLessonDetail?.data?.filter(
      (lesson: HostLessonDetailType) =>
        lessons.some(
          (selectedLesson) => selectedLesson.lesson_id === lesson.lesson_id
        )
    );
    // Remove duplicates by converting to a Set and then back to an array
    const uniqueSelectedLessons = Array.from(
      new Set(selectedLessons?.map((lesson) => lesson.lesson_id))
    ).map((id) => selectedLessons?.find((lesson) => lesson.lesson_id === id)!);

    setSelectedLesson(uniqueSelectedLessons || []);
  };

  return (
    <div>
      <Topbar
        title={lessonDetail ? lessonDetail.data?.title : '클래스명'}
        onClick={() => navigate('/mypage/host')}
      />
      <MyCalendar
        data={calendarData}
        setSelectedLesson={setUniqueSelectedLessons}
      />
      <div className='m-5'>
        <p className='font-hanaMedium text-xl ml-1'>나의 일정 모아보기</p>
        <LessonList
          selectedLesson={selectedLesson}
          handleLessonDetail={handleLessonDetail}
        />
        <ApplicantList />
        <p className='font-hanaMedium text-xl mt-5 ml-1'>클래스 상세 정보</p>
        <LessonDetail lessonDetail={lessonDetail} />
      </div>
    </div>
  );
};
