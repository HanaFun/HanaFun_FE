import { HostLessonInfo } from '../molecules/HostLessonInfo';

interface IProps {
  data: [];
}

export const HostLessonSlider = ({ data }: IProps) => {
  return (
    <div className='h-96 flex justify-center overflow-y-hidden'>
      <HostLessonInfo data={[]} />
    </div>
  );
};
