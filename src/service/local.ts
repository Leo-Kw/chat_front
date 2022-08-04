import { LocationSearchParams } from '../utils'
import { StorageKey } from '../constants'
export enum Locale {
  ZH = 'zh',
  EN = 'en',
}

export function getLocaleService(): Locale {
  const hasLangSearchParam = LocationSearchParams.has('lang')
  const isZh = LocationSearchParams.get('lang') === 'zh_CN'
  if (hasLangSearchParam) {
    return isZh ? Locale.ZH : Locale.EN
  } else {
    const defaultLocale = Locale.ZH
    return (localStorage.getItem(StorageKey.language) as Locale) || defaultLocale
  }
}

export function setLocaleService(locale: Locale) {
  localStorage.setItem(StorageKey.language, locale)
  const searchParams = LocationSearchParams.delete('lang')
  location.search = `?${searchParams.toString()}`
}
