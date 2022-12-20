import hyRequest from '../index'
import { IAccount, IDataType, IRegisterResult } from './type'
export function accountRegisterRequest(registerAccount: IAccount) {
  return hyRequest.post<IDataType<IRegisterResult>>({
    url: '/user/account/register',
    data: registerAccount
  })
}
