import { AxiosInstance } from 'axios'
import { httpService } from '@/shared/http'

import { LoginModule } from './user'

export class APIService {
  private instance: AxiosInstance
  user: LoginModule

  constructor() {
    this.instance = httpService
    this.user = new LoginModule(this.instance)
  }
}
