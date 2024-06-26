import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Topbar } from '../../components/common/Topbar';
import { MyCalendar } from '../../components/molecules/MyCalendar';

export const LessonCalendar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Topbar title='신청 클래스 일정' onClick={() => navigate('/mypage')} />
      <MyCalendar />
      <div className='m-5'>
        <p className='font-hanaMedium text-xl ml-1'>나의 일정 모아보기</p>
      </div>
      <Navbar />
    </div>
  );
};
