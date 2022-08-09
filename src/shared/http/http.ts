import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { resetParams } from './http.utils'
import { handleRequest } from './interceptors'

const flatAxiosResponse = <T>(response: AxiosResponse<T>) => ({
  ...response?.data,
  statusCode: response?.status,
})

const createAxiosInstance = ({ headers, ...otherConfig }: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3101/',
    timeout: 1000 * 90,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      channel: 6,
      version: '1.0.0',
      signature: 'rayvision2017',
      ...headers,
    },
    ...otherConfig,
  })

  axiosInstance.interceptors.request.use(handleRequest)

  return {
    get: <R>(url: string, config?: AxiosRequestConfig) => {
      const params = resetParams(config?.params)
      return axiosInstance.get<R>(url, { ...config, params }).then(flatAxiosResponse)
    },
    post: <R>(url: string, data: R, config?: AxiosRequestConfig) =>
      axiosInstance.post<R>(url, data, config).then(flatAxiosResponse),
  }
}

export const httpService = createAxiosInstance({})
