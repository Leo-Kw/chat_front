import { Component, createRef } from 'react'
import ReactDOM from 'react-dom/client'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Toast, ToastProps } from './toast'
import { AppThemeProvider } from '../../../theme'
import { ManagerWrap } from './atoms'

interface State {
  oven: ToastProps[]
}

export interface CreateToastReturn {
  addNotice: (option: ToastProps) => void
  destroy: () => void
}

class ToastManager extends Component<object, State> {
  public state: State = {
    oven: [],
  }

  add(option: ToastProps) {
    const key = `toast_${Date.now()}_${this.state.oven.length}`
    this.setState((prevState) => ({
      oven: [...prevState.oven, { ...option, key }],
    }))
    if (option.duration > 0) {
      const timeout = setTimeout(() => {
        this.remove(key)
        clearTimeout(timeout)
      }, option.duration)
    }
    return () => {
      this.remove(key)
    }
  }

  remove(key: string) {
    this.setState((prevState) => ({
      oven: prevState.oven.filter((option) => {
        if (option.key === key) {
          if (option.onClose) setTimeout(option.onClose, 200)
          return false
        }
        return true
      }),
    }))
  }

  render() {
    const { oven } = this.state

    return (
      <ManagerWrap>
        <TransitionGroup>
          {oven.map((option, index) => (
            <CSSTransition key={index} classNames='toast' timeout={300}>
              <Toast {...option} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ManagerWrap>
    )
  }
}

export const createToastManager = (): CreateToastReturn => {
  const ref = createRef<ToastManager>()
  const div = document.createElement('div')
  document.body.append(div)
  const root = ReactDOM.createRoot(div!)
  root.render(
    <AppThemeProvider>
      <ToastManager ref={ref} />
    </AppThemeProvider>
  )

  return {
    addNotice(option: ToastProps) {
      return ref.current?.add(option)
    },
    destroy() {
      root.unmount()
      document.body.removeChild(div)
    },
  }
}
