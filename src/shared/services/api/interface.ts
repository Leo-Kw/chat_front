import { UserInfoType } from '@/context/types'
import { MessageTypes } from '@/pages/home/type'

export interface BaseResponse<T = unknown> {
  code: number
  data: T
  message: string
  statusCode: number
  success: boolean
}
export interface LoginParams {
  account: string
  password: string
}
export interface LoginResponse {
  userInfo: UserInfoType
  token: string
}
export interface RegisterParams {
  account: string
  name: string
  email: string
  password: string
}
export interface MessageParams {
  page: number
  pageSize: number
  roomId: number
}
export interface RecordResponse {
  id: number
  messageType: MessageTypes
  messageContent: string
  messageStatus: number
  quoteUserId: number | null
  quoteMessageId: number | null
  roomId: number
  userInfo: {
    avatar: string
    id: number
    name: string
    role: 'admin' | 'viewer'
  }
  createdAt: string
  updatedAt: string
  deletedAt: string
}
export enum SexType {
  Unknown = 1,
  Male,
  Female,
}
export interface PersonalParams {
  id: number
  name: string
  sex: SexType
  sign?: string
}
