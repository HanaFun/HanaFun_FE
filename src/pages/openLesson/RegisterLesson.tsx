import { useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { Button } from '../../components/common/Button';
import { ChangeEvent, useRef, useState } from 'react';
import { CompleteSend } from '../../components/organisms/CompleteSend';
import { FaAngleDown, FaCamera } from 'react-icons/fa';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';
import { SelectAddress } from '../../components/molecules/SelectAddress';
import { ModalBottomContainer } from '../../components/organisms/ModalBottomContainer';
import { AddLessonInputLabel } from '../../components/Atom/AddLessonInputLabel';
import { AddLessonInput } from '../../components/molecules/AddLessonInput';

const categories = [
  '요리',
  '여행',
  '스포츠',
  '예술',
  '심리상담',
  '재테크',
  '자기계발',
  '뷰티',
];

export const RegisterLesson = () => {
  const navigate = useNavigate();
  const [isSend, setIsSend] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const inputMaterialNextID = useRef<number>(1);
  const [inputMaterialItems, setInputMaterialItems] = useState<
    { id: number; text: string }[]
  >([{ id: 0, text: '' }]);
  const inputTimeNextID = useRef<number>(1);
  const [inputTimeItems, setInputTimeItems] = useState<
    { id: number; date: Date; startTime: number; endTime: number }[]
  >([
    {
      id: 0,
      date: new Date(),
      startTime: new Date().getTime(),
      endTime: new Date().getTime(),
    },
  ]);

  const [uploadImageFile, setUploadImageFile] = useState<string | null>(null);
  const inputTitle = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const inputCapacity = useRef<HTMLInputElement | null>(null);
  const inputPrice = useRef<HTMLInputElement | null>(null);
  const inputDetailInfo = useRef<HTMLTextAreaElement | null>(null);

  // input 추가
  const addInput = (isTime: boolean) => {
    if (isTime) {
      if (inputTimeItems.length >= 5) return;
      const input = {
        id: inputTimeNextID.current,
        date: new Date(),
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
      };
      setInputTimeItems([...inputTimeItems, input]);
      inputTimeNextID.current += 1;
    } else {
      if (inputMaterialItems.length >= 5) return;
      const input = { id: inputMaterialNextID.current, text: '' };
      setInputMaterialItems([...inputMaterialItems, input]);
      inputMaterialNextID.current += 1;
    }
  };

  // input 삭제
  const deleteInput = (isTime: boolean, index: number) => {
    if (isTime)
      setInputTimeItems(inputTimeItems.filter((item) => item.id !== index));
    else
      setInputMaterialItems(
        inputMaterialItems.filter((item) => item.id !== index)
      );
  };

  const handleMaterialInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index > inputMaterialItems.length) return;
    const inputItemsCopy = JSON.parse(JSON.stringify(inputMaterialItems));
    inputItemsCopy[index].text = e.target.value;
    setInputMaterialItems(inputItemsCopy);
  };

  const handleTimeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (index > inputTimeItems.length) return;
    const inputItemsCopy = JSON.parse(JSON.stringify(inputTimeItems));
    inputItemsCopy[index].text = e.target.value;
    setInputTimeItems(inputItemsCopy);
  };

  const onChangeUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadImageFile(imageUrl);

      const formData = new FormData();
      if (file) {
        formData.append('file', file);
        console.log('formData>>', formData);
      }
    }
  };

  const onChangeCategory = (category: string) => {
    setCategory(category);
    setShowModal(false);
  };

  const onChangeAddress = (address: string) => {
    if (address && address.length !== 1) {
      setAddress(address);
    } else alert('주소를 입력해주세요.');
  };

  const handlePostAddLesson = () => {
    console.log('사진>>', uploadImageFile);
    console.log('강좌명>>', inputTitle.current?.value);
    console.log('카테고리>>', category);
    console.log('모집인원>>', inputCapacity.current?.value);
    console.log('가격>>', inputPrice.current?.value);
    console.log('클래스 일정>>', uploadImageFile);
    console.log('장소>>', address);
    console.log('준비물>>', uploadImageFile);
    console.log('상세설명>>', inputDetailInfo.current?.value);
    // setIsSend(true);
  };

  return (
    <>
      {showModal && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowModal(false)}
        >
          <h3 className='font-hanaBold text-lg'>카테고리 선택</h3>
          <div className='w-full'>
            <hr />
            <div className='max-h-60 overflow-y-auto scrollbar-hide px-6 py-2'>
              {categories.map((category, idx) => (
                <div key={idx}>
                  <p
                    className='py-2 font-hanaRegular text-base cursor-pointer pl-1'
                    onClick={() => onChangeCategory(category)}
                  >
                    {category}
                  </p>
                  {idx !== categories.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        </ModalBottomContainer>
      )}
      <Topbar title='클래스 등록' onClick={() => navigate('/open-lesson')} />
      {!isSend ? (
        <div className='pt-5 px-5 pb-24 flex flex-col'>
          <AddLessonInputLabel title='사진'>
            <input
              id='imgUploadInput'
              type='file'
              accept='.png, .jpeg, .jpg'
              onChange={onChangeUploadImage}
              className='hidden'
            />
            <label htmlFor='imgUploadInput' className='overflow-hidden'>
              {uploadImageFile ? (
                <img
                  src={uploadImageFile}
                  alt='클래스 이미지'
                  className='w-24 h-24 rounded-lg object-fill drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
                />
              ) : (
                <div className='w-24 h-24 text-hanaSilver text-xs flex flex-col justify-center items-center rounded-lg bg-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.15)]'>
                  <FaCamera size={24} className='mb-0.5' />
                  사진 업로드
                </div>
              )}
            </label>
          </AddLessonInputLabel>
          <AddLessonInput
            type='text'
            title='강좌명'
            placeholder='강좌명을 입력해주세요.(최대 50자)'
            ref={inputTitle}
          />

          <div className='mb-5'>
            <h1 className='font-hanaBold text-lg flex items-end mb-1'>
              카테고리
            </h1>
            <div
              className={`flex items-center justify-between w-full bg-white rounded border-[0.7px] border-hanaSilver text-xs p-2 cursor-pointer ${category !== '' ? 'text-black' : 'text-hanaSilver'}`}
              onClick={() => setShowModal(true)}
            >
              {category !== '' ? category : '카테고리를 선택해주세요'}
              <FaAngleDown size={16} />
            </div>
          </div>
          <AddLessonInput
            type='number'
            title='모집인원'
            placeholder='모집인원을 입력해주세요.'
            ref={inputCapacity}
          />
          <AddLessonInput
            type='number'
            title='가격'
            placeholder='가격을 입력해주세요.'
            ref={inputPrice}
          />
          <AddLessonInputLabel title='클래스 일정'>
            {inputTimeItems.map((item, index) => (
              <div
                key={index}
                className={`w-full flex items-center justify-center gap-3 ${inputTimeItems.length > 1 && index !== inputTimeItems.length - 1 ? 'mb-2' : undefined}`}
              >
                <div className='w-1/2'>
                  <p
                    className={`font-hanaLight text-xs text-black/70 mb-1 ${index !== 0 && 'hidden'}`}
                  >
                    클래스 날짜
                  </p>
                  <input
                    type='date'
                    placeholder='클래스 날짜'
                    className='w-full text-center rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
                    onBlur={(e) => handleTimeInput(e, index)}
                  />
                </div>
                <div className='w-1/2 flex justify-center gap-2'>
                  <div className='w-1/2'>
                    <p
                      className={`w-full font-hanaLight text-xs text-black/70 mb-1 ${index !== 0 && 'hidden'}`}
                    >
                      시작 시간
                    </p>
                    <input
                      type='time'
                      className='w-full text-center rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
                      onBlur={(e) => handleTimeInput(e, index)}
                    />
                  </div>
                  <div className='w-1/2'>
                    <p
                      className={`w-full font-hanaLight text-xs text-black/70 mb-1 ${index !== 0 && 'hidden'}`}
                    >
                      종료 시간
                    </p>
                    <input
                      type='time'
                      className='w-full text-center rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
                      onBlur={(e) => handleTimeInput(e, index)}
                    />
                  </div>
                </div>
                {index === 0 ? (
                  <LuPlusCircle
                    size={24}
                    className='text-hanaSilver mt-5'
                    onClick={() => addInput(true)}
                  />
                ) : (
                  <LuMinusCircle
                    size={24}
                    className='text-hanaSilver'
                    onClick={() => deleteInput(true, item.id)}
                  />
                )}
              </div>
            ))}
          </AddLessonInputLabel>

          <SelectAddress onChangeAddress={onChangeAddress} />
          <AddLessonInputLabel title='준비물'>
            {inputMaterialItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 ${inputMaterialItems.length > 1 && index !== inputMaterialItems.length - 1 ? 'mb-2' : undefined}`}
              >
                <input
                  type='text'
                  placeholder='준비물 입력해주세요.'
                  className='w-1/2 rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
                  onBlur={(e) => handleMaterialInput(e, index)}
                />
                {index === 0 ? (
                  <LuPlusCircle
                    size={24}
                    className='text-hanaSilver'
                    onClick={() => addInput(false)}
                  />
                ) : (
                  <LuMinusCircle
                    size={24}
                    className='text-hanaSilver'
                    onClick={() => deleteInput(false, item.id)}
                  />
                )}
              </div>
            ))}
          </AddLessonInputLabel>
          <AddLessonInputLabel title='상세 설명'>
            <textarea
              ref={inputDetailInfo}
              placeholder='상세 설명을 입력해주세요. (200자 이내)'
              maxLength={200}
              className='w-full h-36 rounded-md border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-3 focus:outline-none'
            ></textarea>
          </AddLessonInputLabel>
        </div>
      ) : (
        <CompleteSend title2='클래스 등록이 완료되었습니다!' />
      )}
      <Button
        message={!isSend ? '등록' : '완료'}
        onClick={() => {
          !isSend ? handlePostAddLesson() : navigate('/mypage');
        }}
      />
    </>
  );
};
