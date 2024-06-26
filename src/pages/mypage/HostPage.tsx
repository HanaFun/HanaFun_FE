import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';

export const HostPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Topbar title='개설 클래스 관리' onClick={() => navigate('/mypage')} />
      <p className='font-hanaRegular text-xl mt-6 ml-6'>개설 클래스 목록</p>
      <p className='font-hanaRegular text-xl mt-6 ml-6'>매출 관리</p>
    </div>
  );
};
