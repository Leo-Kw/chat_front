import { AxiosInstance } from 'axios'
import { BaseResponse, LoginResponse, LoginParams, RegisterParams } from './interface'

export class UserModule {
  constructor(private ins: AxiosInstance) {}
  login = async (parmas: LoginParams) => {
    const res = await this.ins.post<BaseResponse<LoginResponse>>('/user/login', parmas)
    return res.data
  }
  register = async (parmas: RegisterParams) => {
    const res = await this.ins.post<BaseResponse>('/user/register', parmas)
    return res.data
  }
  getUserInfo = async () => {
    const res = await this.ins.post<BaseResponse>('/user/getUserInfo')
    return res.data
  }
}
