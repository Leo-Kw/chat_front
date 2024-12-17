import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import { RouteConfig } from './route'
import { HomeView } from '../pages/home'
import { LoginView } from '../pages/login'
import { RegisterView } from '../pages/register'
import { AuthService } from '../shared/services'

export const router = createBrowserRouter([
  {
    path: RouteConfig.home,
    element: <HomeView />,
    loader: () => {
      const token = AuthService.getToken()
      if (!token) {
        return redirect('/login')
      }
      return true
    },
  },
  {
    path: RouteConfig.login,
    element: <LoginView />,
  },
  {
    path: RouteConfig.register,
    element: <RegisterView />,
  },
  {
    path: '/*',
    element: <Navigate to={RouteConfig.login} />,
  },
])
