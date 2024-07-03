import { PaybackReqType, QrPayReqType } from '../../types/transaction';

export interface transactionApi {
  postQrPay(reqData: QrPayReqType): Promise<
    BaseResponseType<{
      transactionId: number;
    }>
  >;

  postPayback(
    reqData: PaybackReqType
  ): Promise<BaseResponseType<{ transactionId: number }>>;
}
