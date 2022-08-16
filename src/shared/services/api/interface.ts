export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
  statusCode: number
  success: boolean
}

export interface LoginParams {
  account: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterParams {
  account: string
  name: string
  email: string
  password: string
}
