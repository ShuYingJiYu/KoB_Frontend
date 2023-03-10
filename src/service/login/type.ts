export interface IAccount {
  username: string
  password: string
}
export interface ILoginResult {
  id: number
  username: string
  token: string
}
export interface IUserInfo {}
export interface IDataType<T = any> {
  code: number
  data: T
}
