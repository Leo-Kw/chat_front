import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { notice } from './common/components/toast'

// import fib from 'virtual:fib'
// import env from 'virtual:env'
// console.log(env)
// alert(`结果: ${fib(10)}`)

// 初始化Toast
notice({ content: '', type: 'info', duration: 3000 })

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
