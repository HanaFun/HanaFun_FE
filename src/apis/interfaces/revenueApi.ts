export interface revenueApi {
  getTotal(): Promise<BaseResponseType<TotalType>>;

  getMonthRevenue(
    year: number,
    month: number
  ): Promise<BaseResponseType<MonthRevenueType[]>>;
}
