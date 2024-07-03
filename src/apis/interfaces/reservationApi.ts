export interface reservationApi {
  getHostLessonList(): Promise<BaseResponseType<HostLessonType[]>>;

  getHostLessonDetailList(
    lesson_id: number
  ): Promise<BaseResponseType<HostLessonDetailType[]>>;

  postLessonReservation(reqData: ReservationReqType): Promise<
    BaseResponseType<{
      reservationId: number;
    }>
  >;
}
