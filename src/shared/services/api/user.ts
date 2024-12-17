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

  login = async (parmas: LoginParams) => {
    const res = await this.ins.post<BaseResponse<LoginResponse>>('/user/login', parmas)
    return res.data
  }
  register = async (parmas: RegisterParams) => {
    const res = await this.ins.post<BaseResponse>('/user/register', parmas)
    return res.data
  }
  getUserInfo = async () => {
    const res = await this.ins.get<BaseResponse<UserInfoType>>('/user/info')
    return res.data
  }
  uploadAvatar = async (parmas: FormData) => {
    const res = await this.ins.post<BaseResponse>('/user/avatar/upload', parmas)
    return res.data
  }
  updateUserInfo = async (params: PersonalParams) => {
    const res = await this.ins.post<BaseResponse>('/user/modify', params)
    return res.data
  }
}
