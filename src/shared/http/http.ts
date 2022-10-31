import axios, { AxiosRequestConfig } from 'axios'
import { handleError, handleRequest, handleResponse } from './interceptors'

const createAxiosInstance = ({ headers, ...otherConfig }: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 1000 * 90,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // channel: 6,
      version: '1.0.0',
      signature: 'chat_hangzai',
      ...headers,
    },
    ...otherConfig,
  })

  axiosInstance.interceptors.request.use(handleRequest)
  axiosInstance.interceptors.response.use(handleResponse, handleError)

  return axiosInstance
}

export const httpService = createAxiosInstance({})
