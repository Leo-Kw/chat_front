export class LocationSearchParams {
  static has(key: string): boolean {
    const urlParams = new URLSearchParams(decodeURIComponent(location.search))
    return urlParams.has(key)
  }
  static get(key: string): string {
    const urlParams = new URLSearchParams(decodeURIComponent(location.search))
    if (urlParams.has(key)) {
      return urlParams.get(key) || ''
    }
    return ''
  }
  static getAll(): { [key: string]: string } {
    const urlParams = new URLSearchParams(decodeURIComponent(location.search))
    const allParams: { [key: string]: string } = {}
    Array.from(urlParams.entries()).forEach((param) => {
      const [key, value] = param
      if (!['businessType', 'key'].includes(key)) {
        allParams[key] = value
      }
    })
    return allParams
  }
  static set(key: string, value: string): URLSearchParams {
    const urlParams = new URLSearchParams(decodeURIComponent(location.search))
    urlParams.set(key, value)
    return urlParams
  }
  static delete(key: string): URLSearchParams {
    const urlParams = new URLSearchParams(decodeURIComponent(location.search))
    urlParams.delete(key)
    return urlParams
  }
}
