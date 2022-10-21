import './App.css'
// import { RouteConfig } from './constants'
import { RouterProvider } from 'react-router-dom'
import { Layout } from './layout'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { APIProvider, SocketProvider, GloablStateProvider } from './context'
import { APIService } from './shared/services/api'
import { IntlProvider } from 'react-intl'
import { getLocaleService } from './shared/services'

import { Zh, En } from './locale'
import { router } from './route'

const localeMap = {
  zh: Zh,
  en: En,
}

const APIClient = new APIService()

function App() {
  return (
    <IntlProvider messages={localeMap[getLocaleService()]} locale={getLocaleService()}>
      <ThemeProvider theme={theme}>
        <APIProvider client={APIClient}>
          <SocketProvider>
            <GloablStateProvider>
              <Layout>
                <RouterProvider router={router} />
              </Layout>
            </GloablStateProvider>
          </SocketProvider>
        </APIProvider>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
