import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';

export const SalesYear = ({}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Topbar
        title='매출 관리'
        onClick={() => navigate('/mypage/host/sales')}
      />
    </div>
  );
};
