import { useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // react-calendar 기본 스타일
import Calendar from 'react-calendar';
import moment from 'moment';

export const MyCalendar = () => {
  const [value, onChange] = useState(new Date()); // 초깃값 : 현재 날짜
  const [mark, setMark] = useState(['2024-06-07']);

  const handleDateChange = (date: any) => {
    onChange(date);
  };

  const handleOpenList = () => {};

  return (
    <div className='flex items-center justify-center font-hanaRegular'>
      <Calendar
        className='mt-3 p-5 text-center bg-white rounded-2xl border-[1px] border-hanaSilver'
        formatDay={(locale, date) => moment(date).format('D')}
        locale='ko'
        next2Label={null}
        prev2Label={null}
        onChange={handleDateChange}
        showNeighboringMonth={false}
        value={value}
        calendarType='gregory'
        onClickDay={handleOpenList}
        tileContent={({ date, view }) => {
          // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          let html = [];
          // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            html.push(<div className='bg-pink-50'>ㅇ</div>);
          }
          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className='flex justify-center items-center absoluteDiv'>
                {html}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};
