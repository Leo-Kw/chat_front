import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import { RouteConfig } from './route'
import { HomeView } from '../pages/home'
import { LoginView } from '../pages/login'
import { RegisterView } from '../pages/register'
import { AuthService } from '../shared/services'
import { useAPI } from '../hook'

export const Router = () => {
  const API = useAPI()

  return createBrowserRouter([
    {
      path: RouteConfig.home,
      element: <HomeView />,
      loader: () => {
        const token = AuthService.getToken()
        if (!token) {
          return redirect(RouteConfig.login)
        }
        return true
      },
    },
    {
      path: RouteConfig.login,
      element: <LoginView />,
      loader: async () => {
        const { data } = await API.user.checkToken()
        if (data) {
          return redirect(RouteConfig.home)
        }
        return true
      },
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
}
