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
  const [applicants, setApplicants] = useState<PeopleListType | null>(null);
  const currDate = new Date();
  const currYear = Number(currDate.getFullYear());
  const currMonth = Number(currDate.getMonth());
  const [year, setYear] = useState(currYear);
  const [month, setMonth] = useState(currMonth);

  // 개설 클래스 일정 api
  const { data: hostLessonDetail } = useQuery({
    queryKey: ['hostLessonDetail', lesson_id],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getHostLessonDetailList(
        Number(lesson_id)
      );
      return response;
    },
  });

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
          lesson_id: lesson.lessonId,
          lessondateId: lesson.lessondateId,
          date: lesson.date,
        })
      );
      setCalendarData(formattedData);
    }
  }, [hostLessonDetail]);

  // useEffect(() => {
  //   if (lesson_id && hostLessonDetail?.data) {
  //     const selectedLessonDetail = hostLessonDetail.data.find(
  //       (lesson: HostLessonDetailType) => lesson.lessondateId === Number(lesson)
  //     );
  //     if (selectedLessonDetail) {
  //       setSelectedLesson([selectedLessonDetail]);
  //     }
  //   }
  // }, [lesson_id, hostLessonDetail]);

  const handleLessonDetail = async (lesson_id: number) => {
    console.log('확인해보자', hostLessonDetail);
    const selectedLessonDetail = hostLessonDetail?.data?.find(
      (lesson: HostLessonDetailType) => lesson.lessonId === lesson_id
    );
    console.log('여기서 확인', selectedLessonDetail);

    if (selectedLessonDetail) {
      setSelectedLesson([selectedLessonDetail]);
      // 예약자 정보 가져오기
      const id = selectedLessonDetail.lessondateId;
      try {
        console.log('Fetching applicants for lessondate_id:', id);
        console.log;
        const response = await ApiClient.getInstance().peopleList({
          lessondateId: id,
        });
        if (response && response.data) {
          setApplicants(response.data);
        } else {
          setApplicants(null);
        }
      } catch (error) {
        console.error('예약자 정보를 가져오는 데 실패했습니다.', error);
        setApplicants(null);
      }
    } else {
      console.error('선택한 수업의 세부 정보를 찾을 수 없습니다.');
      setApplicants(null);
    }
  };

  const handleDateChange = (date: Date) => {
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
  };

  return (
    <div>
      <Topbar
        title={lessonDetail ? lessonDetail.data?.title : '클래스명'}
        onClick={() => navigate('/mypage/host')}
      />
      <MyCalendar
        data={calendarData}
        setSelectedLesson={(lessons: CalendarDataType[]) => {
          const selectedLessons = hostLessonDetail?.data?.filter(
            (lesson: HostLessonDetailType) =>
              lessons.some(
                (selectedLesson) => selectedLesson.lesson_id === lesson.lessonId
              )
          );
          setSelectedLesson(selectedLessons || []);
        }}
        onDateChange={handleDateChange}
      />
      <div className='m-5'>
        <p className='font-hanaMedium text-xl ml-1'>나의 일정 모아보기</p>
        <LessonList
          selectedLesson={selectedLesson}
          handleLessonDetail={handleLessonDetail}
        />
        <ApplicantList applicants={applicants} />
        <p className='font-hanaMedium text-xl mt-5 ml-1'>클래스 상세 정보</p>
        <LessonDetail lessonDetail={lessonDetail} />
      </div>
    </div>
  );
};
