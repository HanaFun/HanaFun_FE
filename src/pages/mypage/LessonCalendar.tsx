import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Topbar } from '../../components/common/Topbar';
import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

export const LessonCalendar = () => {
  //캘린더에서 년, 월을 변수에 담아줘야 함
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const handleDateChange = () => {};
  return (
    <div>
      <Topbar title='신청 클래스 일정' onClick={() => navigate('/mypage')} />
      <div className='flex items-center justify-center'>
        <Calendar
          className='w-[334px] h-[275px] mt-3 p-5 text-center font-hanaRegular bg-white rounded-2xl border-[1px] border-hanaSilver'
          formatDay={(locale, date) => moment(date).format('DD')}
          onChange={handleDateChange}
          value={value}
        ></Calendar>
      </div>
      <div className='m-5'>
        <p className='font-hanaMedium text-xl ml-1'>나의 일정 모아보기</p>
      </div>
      <Navbar />
    </div>
  );
};
