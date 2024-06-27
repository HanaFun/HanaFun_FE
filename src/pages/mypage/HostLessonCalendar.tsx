import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { MyCalendar } from '../../components/molecules/MyCalendar';
import { useState } from 'react';

export const HostLessonCalendar = () => {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<LessonType[]>([]);

  return (
    <div>
      <Topbar title='클래스 이름' onClick={() => navigate('/host')} />
      <MyCalendar data={[]} setSelectedLesson={setSelectedLesson} />
    </div>
  );
};
