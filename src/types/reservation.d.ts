interface HostLessonType {
  lessonId: number;
  image: string;
  title: string;
}

interface HostLessonDetailType extends MyScheduleType {
  lessondateId: number;
  date: string;
  lessonId: number;
  title: string;
}

interface LessonType {
  reservation_id: number;
  lessondate_id: number;
  lesson_id: number;
  image: string;
  title: string;
  location: string;
  date: string;
  categoryName: string;
}

interface MyLessonType extends LessonType {
  point: number;
  lessons: LessonType[];
}

interface MyScheduleType {
  reservation_id: number;
  lesson_id: number;
  date: string;
  title: string;
}

interface CancelLessonReqType {
  reservation_id: number;
}

interface MyScheduleReqType {
  year: number;
  month: number;
}

interface PeopleType {
  startTime: string;
  userName: string;
  email: string;
}

interface PeopleListType extends PeopleType {
  applicant: number;
  capacity: number;
  people: PeopleType[];
}

interface PeopleListReqType {
  lessondateId: number;
}
