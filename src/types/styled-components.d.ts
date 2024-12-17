import 'styled-components'
import { theme } from '../theme'

type ThemeType = typeof theme

declare module 'styled-components' {
  export type CssProps<T> = ThemeProps<ThemeType> & T
}
