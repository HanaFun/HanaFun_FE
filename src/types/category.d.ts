export type SearchLessonReqType = {
  query: string;
  sort: string;
};

export type SearchLessonResType = {
  lessonId: number;
  image: string;
  title: string;
  price: number;
  hostName: string;
};

export type CategoryType = {
  categoryId: number;
  categoryName: string;
};
