import 'styled-components'
import { theme } from '../theme'

type ThemeType = typeof theme

/* eslint-ignore @typescript-eslint/no-empty-interface */
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
  /* eslint-ignore @typescript-eslint/no-empty-interface */
  export type CssProps<T> = ThemeProps<DefaultTheme> & T
}
