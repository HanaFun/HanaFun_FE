import { useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { qrUserInfo } from '../../components/molecules/QRScanner';
import { Button } from '../../components/common/Button';
import { useEffect, useState } from 'react';
import { ChoiceAccount } from '../../components/organisms/ChoiceAccount';
import { InputMoney } from '../../components/Atom/InputMoney';
import { ChoiceInput } from '../../components/molecules/ChoiceInput';
import { CompleteSend } from '../../components/organisms/CompleteSend';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { ModalBottomContainer } from '../../components/organisms/ModalBottomContainer';
import { useModal } from '../../context/ModalContext';
import { LessonType } from '../../types/lesson';
import { Loading } from '../Loading';

export const QRPay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const userInfo: qrUserInfo = location.state;
  const [isBtnActive, setIsBtnActive] = useState<boolean>(false);
  const [showLessonList, setShowLessonList] = useState<boolean>(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
  const [showLessonDateList, setShowLessonDateList] = useState<boolean>(false);
  const [selectedLessonDate, setSelectedLessonDate] =
    useState<HostLessonDetailType | null>(null);
  const [money, setMoney] = useState<number>(-1);
  const [isSend, setIsSend] = useState<boolean>(false);

  const { data: hostLessonDetail } = useQuery({
    queryKey: ['hostLessonDetail'],
    queryFn: async () => {
      const response = await ApiClient.getHostLessonDetail();
      return response;
    },
  });

  const onChangeLesson = (lesson: LessonType) => {
    setSelectedLesson(lesson);
    setShowLessonList(false);
    checkValid();
  };

  const onChangeLessonDate = (date: HostLessonDetailType) => {
    setSelectedLessonDate(date);
    setShowLessonDateList(false);
    checkValid();
  };

  const onChangeMoney = (money: number) => {
    setMoney(money);
  };

  const checkValid = () => {
    if (
      selectedLesson &&
      selectedLessonDate &&
      money > 0 &&
      money <= userInfo.balance
    )
      setIsBtnActive(true);
    else setIsBtnActive(false);
  };
  const handleSendPayment = () => {
    console.log('출금계좌ID>>', userInfo.accountId);
    console.log('입금계좌ID>>', 1);
    console.log('클래스 ID>>', selectedLesson?.lessonId);
    console.log('클래스일정ID>>', selectedLessonDate?.lessondate_id);
    console.log('지불금액>>', money);
    // setIsSend(true);
  };

  useEffect(() => {
    checkValid();
  }, [money, selectedLesson?.lessonId, selectedLessonDate?.lessondate_id]);

  const {
    data: hostInfo,
    isError: getHostInfoError,
    isLoading: getHostInfoLoading,
  } = useQuery({
    queryKey: ['hostLessons'],
    queryFn: async () => {
      const response = await ApiClient.getInstance().getHostInfo();
      return response;
    },
  });

  if (getHostInfoLoading) {
    return <Loading />;
  }

  if (getHostInfoError) {
    openModal('호스트가 아닙니다. 호스트 등록을 먼저 해주세요.', closeModal);
    navigate('/');
  }

  return (
    <>
      {hostInfo && hostInfo.data && showLessonList && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowLessonList(false)}
        >
          <h3 className='font-hanaBold text-lg'>클래스를 선택해주세요.</h3>
          <div className='w-full'>
            <hr />
            <div className='max-h-60 overflow-y-auto scrollbar-hide px-6 py-2'>
              {hostInfo.data?.lessonList.map((lesson, idx) => (
                <div key={idx}>
                  <p
                    className='py-2 font-hanaRegular text-base cursor-pointer pl-1'
                    onClick={() => onChangeLesson(lesson)}
                  >
                    {lesson.title}
                  </p>
                  {idx + 1 !== hostInfo.data?.lessonList.length && <hr />}
                </div>
              ))}
            </div>
          </div>
        </ModalBottomContainer>
      )}
      {hostLessonDetail && showLessonDateList && (
        <ModalBottomContainer
          color='#FFFFFF'
          onClose={() => setShowLessonDateList(false)}
        >
          <h3 className='font-hanaBold text-lg'>클래스 일정을 선택해주세요.</h3>
          <div className='w-full'>
            <hr />
            <div className='max-h-60 overflow-y-auto scrollbar-hide px-6 py-2'>
              {hostLessonDetail.map((date, idx) => (
                <div key={idx}>
                  <p
                    className='py-2 font-hanaRegular text-base cursor-pointer pl-1'
                    onClick={() => onChangeLessonDate(date)}
                  >
                    {date.date}
                  </p>
                  {idx !== hostLessonDetail.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        </ModalBottomContainer>
      )}
      <Topbar title='QR결제' onClick={() => navigate('/')} />
      {hostInfo && (
        <>
          {!isSend ? (
            <>
              <div className='pt-5 mb-11'>
                <ChoiceAccount
                  accounts={[hostInfo?.data?.account]}
                  isSelectBtn={false}
                />
              </div>
              <div className='px-5 mb-12'>
                <h3 className='font-hanaBold mb-2'>클래스</h3>
                <ChoiceInput
                  isChoice={!!selectedLesson}
                  content={
                    selectedLesson
                      ? selectedLesson.title
                      : '클래스를 선택해주세요.'
                  }
                  openModal={() => setShowLessonList(true)}
                />
                {selectedLesson && (
                  <>
                    <h3 className='font-hanaBold mt-6 mb-2'>클래스 일정</h3>
                    <ChoiceInput
                      isChoice={!!selectedLessonDate}
                      content={
                        selectedLessonDate
                          ? selectedLessonDate.date
                          : '클래스 일정을 선택해주세요.'
                      }
                      openModal={() => setShowLessonDateList(true)}
                    />
                  </>
                )}
              </div>

              <InputMoney
                maxMoney={userInfo.balance}
                isChangeMoney={true}
                changeMoney={onChangeMoney}
              />
            </>
          ) : (
            <CompleteSend title2='결제 성공' />
          )}
        </>
      )}
      <Button
        message={!isSend ? '결제' : '완료'}
        isActive={!isSend ? isBtnActive : true}
        onClick={() => {
          !isSend ? handleSendPayment() : navigate('/');
        }}
      />
    </>
  );
};
