interface HostLessonType {
  lesson_id: number;
  image: string;
  title: string;
}

interface HostLessonListType extends HostLessonType {
  hostLesson: HostLessonType[];
}
