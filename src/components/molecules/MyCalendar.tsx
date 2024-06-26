import { useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // react-calendar 기본 스타일
import Calendar from 'react-calendar';
import moment from 'moment';

interface IProps {
  data: LessonType[] | undefined;
  setSelectedLesson: (lesson: LessonType[]) => void;
}

export const MyCalendar = ({ data, setSelectedLesson }: IProps) => {
  const [value, onChange] = useState(new Date()); // 초깃값 : 현재 날짜
  const [mark, setMark] = useState<string[]>([]);

  const handleDateChange = (date: Date) => {
    onChange(date);
    const selectedDate = moment(date).format('YYYY-MM-DD');
    const lessons = data.filter((lesson) => lesson.date === selectedDate);
    setSelectedLesson(lessons);
  };

  console.log(data);

  useState(() => {
    if (data) {
      const dates = data.map((lesson) => lesson.date);
      console.log(dates);
      setMark(dates);
    }
  }, [data]);

  console.log(mark);

  const handleOpenList = () => {};

  return (
    <div className='flex flex-col items-center justify-center font-hanaRegular'>
      <Calendar
        className='mt-3 p-5 text-center font-hanaRegular bg-white rounded-2xl border-[1px] border-hanaSilver'
        formatDay={(locale, date) => moment(date).format('D')}
        locale='ko'
        next2Label={null}
        prev2Label={null}
        onChange={() => handleDateChange}
        showNeighboringMonth={false}
        value={value}
        calendarType='gregory'
        onClickDay={handleOpenList}
        tileContent={({ date, view }) => {
          let html = [];
          if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(<div className='bg-pink-50'>v</div>);
          }
          return (
            <div className='flex justify-center items-center absoluteDiv'>
              {html}
            </div>
          );
        }}
      />
    </div>
  );
};
