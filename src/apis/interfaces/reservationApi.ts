import {
  HostLessonDetailType,
  HostLessonType,
  ReservationReqType,
} from '../../types/reservation';

export interface reservationApi {
  getHostLessonList(): Promise<BaseResponseType<HostLessonType[]>>;

  getHostLessonDetailList(
    lesson_id: number
  ): Promise<BaseResponseType<HostLessonDetailType[]>>;

  postLessonReservation(reqData: ReservationReqType): Promise<
    BaseResponseType<{
      message: string;
    }>
  >;
}
