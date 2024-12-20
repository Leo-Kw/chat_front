import { UserInfoType } from '../../../context'
import { AxiosInstance } from 'axios'
import {
  BaseResponse,
  LoginResponse,
  LoginParams,
  RegisterParams,
  PersonalParams,
} from './interface'

export class UserModule {
  constructor(private ins: AxiosInstance) {}

  login = async (params: LoginParams) => {
    const res = await this.ins.post<BaseResponse<LoginResponse>>('/user/login', params)
    return res.data
  }
  register = async (params: RegisterParams) => {
    const res = await this.ins.post<BaseResponse>('/user/register', params)
    return res.data
  }
  getUserInfo = async () => {
    const res = await this.ins.get<BaseResponse<UserInfoType>>('/user/info')
    return res.data
  }
  uploadAvatar = async (params: FormData) => {
    const res = await this.ins.post<BaseResponse>('/user/avatar/upload', params)
    return res.data
  }
  updateUserInfo = async (params: PersonalParams) => {
    const res = await this.ins.post<BaseResponse>('/user/modify', params)
    return res.data
  }
  checkToken = async () => {
    const res = await this.ins.post<BaseResponse>('/user/token/check')
    return res.data
  }
}
