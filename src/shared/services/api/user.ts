import { AxiosInstance } from 'axios'
import { BaseResponse, LoginResponse, LoginParams, RegisterParams } from './interface'

export class LoginModule {
  constructor(private ins: AxiosInstance) {}
  login = async (parmas: LoginParams) => {
    const res = await this.ins.post<BaseResponse<LoginResponse>>('/api/user/login', parmas)
    return res.data
  }
  register = async (parmas: RegisterParams) => {
    const res = await this.ins.post<BaseResponse>('/api/user/register', parmas)
    return res.data
  }
}
