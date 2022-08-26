import { useIntl, createIntl, createIntlCache } from 'react-intl'
import { Zh, En } from '../locale'

const cache = createIntlCache()
export const intlCache = createIntl(
  {
    locale: localStorage.getItem('language') ?? 'zh',
    messages: localStorage.getItem('language') === 'zh' ? Zh : En,
  },
  cache
)

export function useIntlLocale() {
  const { formatMessage } = useIntl()

  const t = (id: string) => formatMessage({ id })

  return t
}
