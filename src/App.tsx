import './App.css'
import { RouteConfig } from './constants'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Layout } from './layout'

import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { APIProvider } from './context'
import { APIService } from './shared/services/api'

import { LoginView } from './pages/login'
import { RegisterView } from './pages/register'
import { HomeView } from './pages/home'

const APIClient = new APIService()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <APIProvider client={APIClient}>
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
      </APIProvider>
    </ThemeProvider>
  )
}

export default App
