export interface IAddBot {
  title: string
  description: string
  content: string
}
export interface IUpdateBot {
  bot_id: number
  title: string
  description: string
  content: string
}
export interface BotListResult {
  botList: any[]
  botCount: number
}
export interface IDataType<T = any> {
  code: number
  error: string
  success: string
  error_message: string
  data: T
}
