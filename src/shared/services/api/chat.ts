import { AxiosInstance } from 'axios'

export class ChatModule {
  constructor(private ins: AxiosInstance) {}

  test = async (parmas: any) => {
    const res = await this.ins.post('/api/chat/test', parmas)
    return res.data
  }
}