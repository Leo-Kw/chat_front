import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { Toast } from '@/common/components'
import { AuthService } from '@/shared/services'

export interface ResponseError {
  message: string
}

export const handleRequest = (config: AxiosRequestConfig) => {
  const token = AuthService.getToken()
  if (token) {
    config.headers!['token'] = token
  }
  return config
}

export const handleError = (error: AxiosError<ResponseError>) => {
  const code = error.response?.status
  if (code && code !== 200) {
    Toast.error(error.response?.data.message)
  } else {
    Toast.error('服务器错误！请联系管理员')
  }
  return Promise.resolve(error.response)
}

export const handleResponse = (response: AxiosResponse) => {
  return response
}
