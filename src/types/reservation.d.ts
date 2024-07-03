interface HostLessonType {
  lessonId: number;
  image: string;
  title: string;
}

interface HostLessonDetailType {
  lessondate_id: number;
  date: string;
  lesson_id: number;
  title: string;
}

interface LessonType extends CommonLessonType {
  reservation_id: number;
  lessondate_id: number;
  lesson_id: number;
  image: string;
  title: string;
  location: string;
  date: string;
}

interface MyLessonType extends LessonType {
  point: number;
  lessons: LessonType[];
}
