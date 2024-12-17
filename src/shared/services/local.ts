import { LocationSearchParams } from '../../utils'
import { StorageKey } from '../../constants'
export enum Locale {
  ZH = 'zh',
  EN = 'en',
}

export function getLocaleService(): Locale {
  const hasLangSearchParam = LocationSearchParams.has('language')
  const isZh = LocationSearchParams.get('language') === 'zh_CN'
  if (hasLangSearchParam) {
    return isZh ? Locale.ZH : Locale.EN
  } else {
    const defaultLocale = Locale.ZH
    return (localStorage.getItem(StorageKey.language) as Locale) || defaultLocale
  }
}

export function setLocaleService(locale: Locale) {
  localStorage.setItem(StorageKey.language, locale)
  window.location.reload()
}
