import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from './url';
import { getCookie } from '../utils/cookie';
import { userApi } from './interfaces/userApi';
import { LoginType } from '../types/user';
import { AccountType } from '../types/account';
import { accountApi } from './interfaces/accountApi';
import { hostApi } from './interfaces/hostApi';

export class ApiClient implements userApi, accountApi, hostApi {
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
    console.log(lesson_id);
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
