// import { RouteConfig } from './constants'
import { RouterProvider } from 'react-router-dom'
import { Layout } from './layout'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { APIProvider, SocketProvider, GlobalStateProvider } from './context'
import { APIService } from './shared/services/api'
import { IntlProvider } from 'react-intl'
import { getLocaleService } from './shared/services'

import { Zh, En } from './locale'
import { Router } from './route'

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
            <GlobalStateProvider>
              <Layout>
                <RouterProvider router={Router()} />
              </Layout>
            </GlobalStateProvider>
          </SocketProvider>
        </APIProvider>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
