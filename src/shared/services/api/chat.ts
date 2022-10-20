import { AxiosInstance } from 'axios'

export class ChatModule {
  constructor(private ins: AxiosInstance) {}

  getUserInfo = async (id: number) => {
    const res = await this.ins.post('/api/user/getUserInfo', { id })
    return res.data
  }
}
