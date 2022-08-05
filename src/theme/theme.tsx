import { ThemeProvider } from 'styled-components'
import { theme } from './variables'

interface Props {
  children: React.ReactNode
}

export const AppThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
