import { AiOutlineClose } from 'react-icons/ai';
import { useModal } from '../../context/ModalContext';

const Modal = () => {
  const { isModalOpen, modalMessage, modalTitle, onConfirm, closeModal } =
    useModal();

  if (!isModalOpen) {
    return null;
  }

  const handleConfirm = () => {
    closeModal();
    onConfirm();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40'>
      <div className='flex flex-col justify-center bg-white rounded-xl w-[277px] h-40 gap-3 z-50'>
        {modalTitle && (
          <p className='text-hanaGreen font-hanaBold text-center text-base'>
            {modalTitle}
          </p>
        )}
        <div className='fixed w-96 h-screen z-40 flex justify-center items-center mb-28 ml-[70px]'>
          <AiOutlineClose
            className='text-hanaSilver cursor-pointer'
            onClick={closeModal}
          />
        </div>
        <p className='font-hanaMedium text-center text-lg mt-2'>
          {modalMessage}
        </p>
        <div className='flex justify-center gap-4'>
          <button
            type='button'
            className='w-20 h-11 text-xl font-hanaMedium bg-hanaSilver text-white rounded-xl cursor-pointer'
            onClick={closeModal}
          >
            취소
          </button>
          <button
            type='button'
            className='w-[146px] h-11 text-xl font-hanaMedium bg-hanaNavGreen text-white rounded-xl cursor-pointer'
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
