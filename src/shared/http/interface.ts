export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
  statusCode: number
  success: boolean
}

export interface ResponseError {
  message: string
}
