import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { Toast } from '@/common/components'
import { AuthService } from '@/shared/services'

export interface ResponseError {
  message: string
}

export const handleRequest = (config: AxiosRequestConfig) => {
  const token = AuthService.getToken()
  if (token) {
    config.headers!['authorization'] = token
  }
  return config
}

export const handleError = (error: AxiosError<ResponseError>) => {
  const code = error.response?.status
  console.log(code)
  if (code && code !== 200) {
    Toast.error(error.response?.data.message)
    if (code === 401) {
      window.location.href = '/login'
      AuthService.removeToken()
    }
  } else {
    Toast.error('服务器错误！请联系管理员')
  }
  return Promise.resolve(error.response)
}

export const handleResponse = (response: AxiosResponse) => {
  return response
}
