import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import intl from 'react-intl-universal'
import { Locale } from './service'
import { Zh, En } from './locale'
import { getLocaleService } from './service'

// 用来注入 Windi CSS 所需的样式，一定要加上!
import 'virtual:windi.css'

intl.init({
  currentLocale: getLocaleService(),
  locales: {
    [Locale.ZH]: Zh,
    [Locale.EN]: En,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
