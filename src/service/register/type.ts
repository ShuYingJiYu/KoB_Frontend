export interface IAccount {
  username: string
  password: string
  confirmedPassword: string
}
export interface IRegisterResult {
  id: number
  username: string
  password: string
  confirmedPassword: string
  error_message: any
}
export interface IDataType<T = any> {
  code: number
  data: T
  error_message: string
}
