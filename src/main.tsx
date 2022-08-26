import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import { Zh, En } from './locale'
import { notice } from './common/components/toast'

// 用来注入 Windi CSS 所需的样式，一定要加上!
import 'virtual:windi.css'

// 初始化Toast
notice({ content: '', type: 'info', duration: 3000 })

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
