import { SexType } from '../shared/services'

// global-state
export interface UserInfoType {
  id: number
  sex: SexType
  name: string
  email: string
  sign: string
  role: string
  room_id: string
  avatar: string
  account: string
}

export enum ActionType {
  SetUserInfo = 'SetUserInfo',
  SetRoomId = 'SetRoomId',
  SetMessageList = 'SetMessageList',
  AddNewMessage = 'AddNewMessage',
  AddOneUnreadMessNum = 'AddOneUnreadMessNum',
  ClearUnreadMessNum = 'ClearUnreadMessNum',
}
