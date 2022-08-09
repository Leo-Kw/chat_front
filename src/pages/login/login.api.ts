import { httpService } from '@/shared/http/http'
import { LoginType } from './login.type'

export const LoginApi = {
  login(params: LoginType.LoginParams) {
    return httpService.post('/login', params)
  },
}
