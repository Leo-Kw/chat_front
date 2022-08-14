export interface CommonResponse<T = any> {
  code: number
  data: T
  message: string
  statusCode: number
  success: boolean
}
