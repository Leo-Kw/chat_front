export namespace LoginType {
  export interface LoginParams {
    account: number
    password: number
  }
  export interface LoginResponse {
    token: string
  }
}
