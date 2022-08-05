import './App.css'
import { RouteConfig } from './constants'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Layout } from './layout'

import { LoginView } from './pages/login'
import { RegisterView } from './pages/register'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={RouteConfig.login} element={<LoginView />} />
            <Route path={RouteConfig.register} element={<RegisterView />} />
            <Route path='*' element={<Navigate to={RouteConfig.login} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
