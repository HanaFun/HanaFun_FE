interface HostLessonType {
  lessonId: number;
  image: string;
  title: string;
}

interface HostLessonDetailType extends MyScheduleType {
  lessondate_id: number;
  date: string;
  lesson_id: number;
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
