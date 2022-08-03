import './App.css'
import { RouteConfig } from './constants/route'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Layout } from './layout'

import { LoginView } from './pages/login'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={RouteConfig.login} element={<LoginView />} />
          <Route path='*' element={<Navigate to={RouteConfig.login} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
