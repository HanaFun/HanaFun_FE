import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { HostLessonSlider } from '../../components/organisms/HostLessonSlider';
import { SalesCard } from '../../components/molecules/SalesCard';

export const HostPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Topbar title='개설 클래스 관리' onClick={() => navigate('/mypage')} />
      <p className='font-hanaRegular text-xl mt-6 ml-6'>개설 클래스 목록</p>
      <HostLessonSlider data={[]} />
      <p className='font-hanaRegular text-xl mt-6 ml-6'>매출 관리</p>
      <div className='flex justify-center'>
        <SalesCard />
      </div>
    </div>
  );
};
