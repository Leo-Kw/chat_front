import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { Toast } from '@/common/components'

export const handleRequest = (config: AxiosRequestConfig) => {
  const token = ''
  if (token) {
    config.headers!['token'] = ''
  }
  return config
}
