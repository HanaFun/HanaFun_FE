import { useNavigate, useParams } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { LineChart } from '../../components/molecules/LineChart';
import { Calculator } from '../../components/molecules/Calculator';

export const SalesYear = () => {
  const { year, lesson_id } = useParams<{ year: string; lesson_id: string }>();
  const navigate = useNavigate();
  console.log(year, lesson_id);

  return (
    <div>
      <Topbar
        title='매출 관리'
        onClick={() => navigate('/mypage/host/sales')}
      />
      <div className='flex justify-between font-hanaMedium text-xl mt-4 px-6'>
        <p>{} 매출액</p>
        <p>{year}년</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-[351px] h-[240px] mt-3 bg-white rounded-xl shadow-md'>
          <LineChart />
        </div>
      </div>
      <div className='flex justify-center items-center flex-col'>
        <p className='font-hanaMedium text-xl mt-7 mb-5 px-6'>순수익 계산기</p>
        <Calculator />
      </div>
    </div>
  );
};
