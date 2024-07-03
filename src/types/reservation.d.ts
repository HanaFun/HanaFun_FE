interface HostLessonType {
  lessonId: number;
  image: string;
  title: string;
}

interface HostLessonDetailType {
  lessondateId: number;
  date: string;
  lessonId: number;
  title: string;
}

interface ReservationReqType {
  lessondateId: number;
  applicant: number;
  accountId: number;
  password: string;
}
