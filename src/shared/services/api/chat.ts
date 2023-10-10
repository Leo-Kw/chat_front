import { AxiosInstance } from 'axios'
import { BaseResponse, MessageParams, RecordResponse } from './interface'

export class ChatModule {
  constructor(private ins: AxiosInstance) {}

  getMessage = async (parmas: MessageParams) => {
    const res = await this.ins.post<BaseResponse<RecordResponse[]>>('/chat/message/get', parmas)
    return res.data
  }
}
