import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { resetParams } from './http.utils'
import { handleError, handleRequest, handleResponse } from './interceptors'
import { BaseResponse } from './interface'

const flatAxiosResponse = <T>(response: AxiosResponse<T>) => ({
  ...response?.data,
  statusCode: response?.status,
})

const createAxiosInstance = ({ headers, ...otherConfig }: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: 'api/',
    timeout: 1000 * 90,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      channel: 6,
      version: '1.0.0',
      signature: 'chat_hangzai',
      ...headers,
    },
    ...otherConfig,
  })

  axiosInstance.interceptors.request.use(handleRequest)
  axiosInstance.interceptors.response.use(handleResponse, handleError)

  return {
    get: <R>(url: string, config?: AxiosRequestConfig) => {
      const params = resetParams(config?.params)
      return axiosInstance.get<BaseResponse<R>>(url, { ...config, params }).then(flatAxiosResponse)
    },
    post: <P, R>(url: string, data: P, config?: AxiosRequestConfig) =>
      axiosInstance.post<BaseResponse<R>>(url, data, config).then(flatAxiosResponse),
  }
}

export const httpService = createAxiosInstance({})
