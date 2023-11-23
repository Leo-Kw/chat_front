import { AxiosInstance } from 'axios'
import { BaseResponse, MessageParams, RecordResponse, SearchMessageParams } from './interface'

export class ChatModule {
  constructor(private ins: AxiosInstance) {}

  getMessage = async (parmas: MessageParams) => {
    const res = await this.ins.post<BaseResponse<RecordResponse[]>>('/chat/message/get', parmas)
    return res.data
  }

  searchHistory = async (params: SearchMessageParams) => {
    const res = await this.ins.post<BaseResponse<RecordResponse[]>>('/chat/message/search', params)
    return res.data
  }
}
