export interface transactionApi {
  postQrPay(reqData: QrPayReqType): Promise<BaseResponseType<PayResType>>;

  postSimplePay(
    reqData: SimplePayReqType
  ): Promise<BaseResponseType<PayResType>>;
}
