export interface reservationApi {
  getHostLessonList(): Promise<BaseResponseType<HostLessonListType>>;
}
