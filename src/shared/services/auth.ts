export class AuthService {
  static authorization: string
  static setToken(authorization: string) {
    this.authorization = authorization
    window.localStorage.setItem('chat_token', authorization)
  }
  static getToken() {
    if (!this.authorization) {
      const authorization = window.localStorage.getItem('chat_token')
      if (authorization) {
        this.authorization = authorization
      } else {
        return ''
      }
    }
    return this.authorization
  }
  static removeToken() {
    window.localStorage.removeItem('chat_token')
  }
}
