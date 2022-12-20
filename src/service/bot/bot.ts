import hyRequest from '../index'
import { IAddBot, IUpdateBot, IDataType, BotListResult } from './type'
enum BotApi {
  AddBot = '/user/bot/add',
  UpdateBot = '/user/bot/update',
  RemoveBot = '/user/bot/remove',
  GetBotList = '/user/bot/getlist'
}
export function AddBotRequest(AddBotDetail: IAddBot) {
  return hyRequest.post<IDataType>({
    url: BotApi.AddBot,
    data: AddBotDetail
  })
}
export function UpdateBotRequest(UpdateBotDetail: IUpdateBot) {
  return hyRequest.post<IDataType>({
    url: BotApi.UpdateBot,
    data: UpdateBotDetail
  })
}
export function RemoveBotRequest(bot_id: any) {
  return hyRequest.post<IDataType>({
    url: BotApi.RemoveBot,
    data: bot_id
  })
}
export function GetListBotRequest(url: string) {
  return hyRequest.get<IDataType<BotListResult>>({
    url: url
  })
}
