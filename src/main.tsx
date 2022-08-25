import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import intl from 'react-intl-universal'
import { Locale } from './shared/services'
// import { Zh, En } from './locale'
import { getLocaleService } from './shared/services'
import { notice } from './common/components/toast'

// 用来注入 Windi CSS 所需的样式，一定要加上!
import 'virtual:windi.css'

// intl.init({
//   currentLocale: getLocaleService(),
//   locales: {
//     [Locale.ZH]: Zh,
//     [Locale.EN]: En,
//   },
// })

// 初始化Toast
notice({ content: '', type: 'info', duration: 3000 })

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
