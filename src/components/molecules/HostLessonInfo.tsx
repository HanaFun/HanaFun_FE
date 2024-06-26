import { GrFormNext } from 'react-icons/gr';

interface IProps {
  data: [];
}

export const HostLessonInfo = ({ data }: IProps) => {
  const lessonName = '클래스1';
  return (
    <div className=' w-[351px] h-[70px] bg-white shadow-md rounded-2xl mt-4 p-3 flex justify-between items-center font-hanaRegular text-xl cursor-pointer'>
      <div className='flex flex-row items-center'>
        <img
          src='/images/mypage/sample_lessoncard.png'
          alt=''
          className='w-11 h-11 rounded-lg mr-7'
        />
        <p>{lessonName}</p>
      </div>
      <GrFormNext />
    </div>
  );
};
