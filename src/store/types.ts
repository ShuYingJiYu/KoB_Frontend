import { IloginState } from './login/types'
import { IBotState } from './bot/types'
import { IPkState } from './pk/types'
export interface IRootState {
  login: any
  username: string
  age: number
}

export interface IRootWithModule {
  login: IloginState
  bot: IBotState
  pk: IPkState
}

export type IStoreType = IRootState & IRootWithModule
