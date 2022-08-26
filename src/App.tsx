import './App.css'
import { RouteConfig } from './constants'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Layout } from './layout'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { APIProvider, SocketProvider } from './context'
import { APIService } from './shared/services/api'
import { IntlProvider } from 'react-intl'
import { getLocaleService } from './shared/services'

import { LoginView } from './pages/login'
import { RegisterView } from './pages/register'
import { HomeView } from './pages/home'

import { Zh, En } from './locale'

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
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path={RouteConfig.home} element={<HomeView />} />
                  <Route path={RouteConfig.login} element={<LoginView />} />
                  <Route path={RouteConfig.register} element={<RegisterView />} />
                  <Route path='*' element={<Navigate to={RouteConfig.login} />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </SocketProvider>
        </APIProvider>
      </ThemeProvider>
    </IntlProvider>
  )
}

export default App
