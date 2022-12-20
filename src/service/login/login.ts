import hyRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'

enum LoginApi {
  AccountLogin = '/user/account/token',
  UserInfo = '/user/account/info'
}
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}
export function userInfoRequest() {
  return hyRequest.get<IDataType>({
    url: LoginApi.UserInfo,
    showLoading: false
  })
}
