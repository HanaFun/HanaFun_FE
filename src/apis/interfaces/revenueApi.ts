export interface revenueApi {
  getTotal(): Promise<BaseResponseType<TotalType>>;
}
