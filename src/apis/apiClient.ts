import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from './url';
import { getCookie } from '../utils/cookie';
import { userApi } from './interfaces/userApi';
import { accountApi } from './interfaces/accountApi';
import { hostApi } from './interfaces/hostApi';
import { categoryApi } from './interfaces/categoryApi';
import {
  CreateHostReqType,
  CreateHostResType,
  HostInfoType,
} from '../types/host';
import { transactionApi } from './interfaces/transactionApi';

export class ApiClient
  implements userApi, accountApi, hostApi, categoryApi, transactionApi
{
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  // ------- user -------
  async postLogin(password: string) {
    try {
      const response = await this.axiosInstance.request<
        BaseResponseType<LoginType>
      >({
        method: 'post',
        url: '/user/login',
        data: { password: password },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) throw error.response?.data;
      else throw new Error('unexpected error');
    }
  }

  async getIsHost() {
    const response = await this.axiosInstance.request<
      BaseResponseType<{ isHost: boolean }>
    >({
      method: 'get',
      url: '/user/ishost',
    });
    return response.data;
  }

  // ------- account -------
  async getAccountList() {
    const response = await this.axiosInstance.request<
      BaseResponseType<AccountType[]>
    >({
      method: 'get',
      url: '/account/list',
    });
    return response.data;
  }

  async postCheckPw(reqData: CheckPwReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<CheckPwResType>
    >({
      method: 'post',
      url: '/account/pw',
      data: reqData,
    });
    return response.data;
  }

  // ------- host -------
  async postCreateHost(reqData: CreateHostReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<CreateHostResType>
    >({
      method: 'post',
      url: '/host/create',
      data: reqData,
    });
    return response.data;
  }

  async getHostInfo() {
    try {
      const response = await this.axiosInstance.request<
        BaseResponseType<HostInfoType>
      >({
        method: 'get',
        url: '/host/info',
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) throw error.response?.data;
      else throw new Error('unexpected error');
    }
  }

  // ------- category -------
  async getSearchLessonAll(reqData: SearchLessonReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<SearchLessonResType[]>
    >({
      method: 'get',
      url: `/category/all?query=${reqData.query}&sort=${reqData.sort}`,
    });
    return response.data;
  }

  async getSearchLessonCategory(
    categoryId: number,
    reqData: SearchLessonReqType
  ) {
    const response = await this.axiosInstance.request<
      BaseResponseType<SearchLessonResType[]>
    >({
      method: 'get',
      url: `/category/${categoryId}?query=${reqData.query}&sort=${reqData.sort}`,
    });
    return response.data;
  }

  async getCategoryList() {
    const response = await this.axiosInstance.request<
      BaseResponseType<CategoryType[]>
    >({
      method: 'get',
      url: '/category',
    });
    return response.data;
  }

  // ------- mypage -------

  // 하나머니 조회
  async getPoint() {
    const response = await this.axiosInstance.request<
      BaseResponseType<PointType>
    >({
      method: 'get',
      url: '/user/point',
    });
    return response.data;
  }

  //---------host---------

  //---------account---------

  //---------transaction---------
  async postQrPay(reqData: QrPayReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<PayResType>
    >({
      method: 'post',
      url: '/transaction/qr',
      data: reqData,
    });
    return response.data;
  }

  async postSimplePay(reqData: SimplePayReqType) {
    try {
      const response = await this.axiosInstance.request<
        BaseResponseType<PayResType>
      >({
        method: 'post',
        url: '/transaction/simple',
        data: reqData,
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) throw error.response?.data;
      else throw new Error('unexpected error');
    }
  }

  //---------category---------

  //---------lesson---------

  // 클래스 상세
  async getLessonDetail(lesson_id: number) {
    const response = await this.axiosInstance.request<
      BaseResponseType<LessonDetailType>
    >({
      method: 'get',
      url: `/lesson/${lesson_id}`,
    });
    return response.data;
  }

  async getLessonDate(lessonId: number) {
    const response = await this.axiosInstance.request<
      BaseResponseType<LessonDateType[]>
    >({
      method: 'get',
      url: `/lesson/date-select?lessonId=${lessonId}`,
    });
    return response.data;
  }

  //---------reservation---------

  // 개설 클래스 관리 (전체 목록)
  async getHostLessonList() {
    const response = await this.axiosInstance.request<
      BaseResponseType<HostLessonType[]>
    >({
      method: 'get',
      url: '/reservation/my/opened',
    });
    console.log(response);
    return response.data;
  }

  // 개설 클래스 상세
  async getHostLessonDetailList(lesson_id: number) {
    const response = await this.axiosInstance.request<
      BaseResponseType<HostLessonDetailType[]>
    >({
      method: 'get',
      url: `/reservation/my/opened/${lesson_id}`,
    });
    console.log(lesson_id);
    console.log(response);
    return response.data;
  }

  async postLessonReservation(reqData: ReservationReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<{ message: string }>
    >({
      method: 'post',
      url: '/reservation/check',
      data: reqData,
    });
    return response.data;
  }

  //---------revenue---------

  // 임의 데이터. 마이페이지 홈 화면 호출
  public static async getMyLesson(): Promise<MyLessonType> {
    const apiUrl = '/data/myLesson.json';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  // 임의 데이터. 신청 클래스 목록 페이지 호출
  public static async getMyLessonAll(): Promise<LessonType[]> {
    const apiUrl = '/data/myLessonAll.json';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  // 임의 데이터. 클래스 년/월 별 매출액
  public static async getMonthSales(): Promise<MonthSalesType[]> {
    const apiUrl = '/data/monthRevenue.json';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  static getInstance(): ApiClient {
    return this.instance || (this.instance = new this());
  }

  // registerToken(newToken: string) {
  //   this.axiosInstance = this.createAxiosInstance(newToken);
  // }

  logout() {
    this.axiosInstance = this.createAxiosInstance();
  }

  private createAxiosInstance = () => {
    const headers: any = {
      'content-type': 'application/json',
    };

    const newInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 100000,
      headers,
    });

    newInstance.interceptors.request.use(
      (config) => {
        const TOKEN = getCookie('token');
        if (TOKEN) {
          config.headers['Authorization'] = `Bearer ${TOKEN}`;
        }

        config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    return newInstance;
  };
}
