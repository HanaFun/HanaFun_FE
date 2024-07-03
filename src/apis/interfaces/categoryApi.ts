import {
  CategoryType,
  SearchLessonReqType,
  SearchLessonResType,
} from '../../types/category';

export interface categoryApi {
  getSearchLessonAll(
    reqData: SearchLessonReqType
  ): Promise<BaseResponseType<SearchLessonResType[]>>;
  getSearchLessonCategory(
    categoryId: number,
    reqData: SearchLessonReqType
  ): Promise<BaseResponseType<SearchLessonResType[]>>;
  getCategoryList(): Promise<BaseResponseType<CategoryType[]>>;
}
