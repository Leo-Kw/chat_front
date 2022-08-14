import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { resetParams } from './http.utils'
import { handleRequest } from './interceptors'
import { CommonResponse } from './interface'

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

  return {
    get: <R>(url: string, config?: AxiosRequestConfig) => {
      const params = resetParams(config?.params)
      return axiosInstance
        .get<CommonResponse<R>>(url, { ...config, params })
        .then(flatAxiosResponse)
    },
    post: <R>(url: string, data: R, config?: AxiosRequestConfig) =>
      axiosInstance.post<CommonResponse<R>>(url, data, config).then(flatAxiosResponse),
  }
}

export const httpService = createAxiosInstance({})
