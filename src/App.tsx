import './App.css'
import { RouteConfig } from './constants/route'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { LoginView } from './pages/login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteConfig.login} element={<LoginView />} />
        <Route path='*' element={<Navigate to={RouteConfig.login} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
