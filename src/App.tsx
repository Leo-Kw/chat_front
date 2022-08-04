import './App.css'
import { RouteConfig } from './constants'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Layout } from './layout'

import { LoginView } from './pages/login'
import { RegisterView } from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={RouteConfig.login} element={<LoginView />} />
          <Route path={RouteConfig.register} element={<RegisterView />} />
          <Route path='*' element={<Navigate to={RouteConfig.login} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
