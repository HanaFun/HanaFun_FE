import {
  AccountType,
  CheckPwReqType,
  CheckPwResType,
} from '../../types/account';

export interface accountApi {
  getAccountList(): Promise<BaseResponseType<AccountType[]>>;
  getCheckPw(
    reqData: CheckPwReqType
  ): Promise<BaseResponseType<CheckPwResType>>;
}
