import { AxiosInstance } from 'axios'
import { BaseResponse, RecordParams, RecordResponse } from './interface'

export class ChatModule {
  constructor(private ins: AxiosInstance) {}

  getRecord = async (parmas: RecordParams) => {
    const res = await this.ins.post<BaseResponse<RecordResponse[]>>('/chat/getRecord', parmas)
    return res.data
  }
}
