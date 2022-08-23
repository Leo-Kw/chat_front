import { AxiosInstance } from 'axios'
import { httpService } from '@/shared/http'

import { UserModule } from './user'
import { ChatModule } from './chat'

export class APIService {
  private instance: AxiosInstance
  user: UserModule
  chat: ChatModule

  constructor() {
    this.instance = httpService
    this.user = new UserModule(this.instance)
    this.chat = new ChatModule(this.instance)
  }
}
