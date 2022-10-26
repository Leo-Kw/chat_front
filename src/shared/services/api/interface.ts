import { UserInfoType } from '@/context/types'

export interface BaseResponse<T = any> {
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
  userId: number
  messageType: string
  messageContent: string
  messageStatus: number
  quoteUserId: number | null
  quoteMessageId: number | null
  roomId: number
  userAvatar: string
  userName: string
  userRole: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}
