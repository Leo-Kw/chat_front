import 'styled-components'
import { theme } from '../theme'

type ThemeType = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
  export type CssProps<T> = ThemeProps<DefaultTheme> & T
}
