import React from 'react'
import ReactDOM from 'react-dom/client'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Toast, ToastProps } from './toast'
import { AppThemeProvider } from '@/theme'
import { ManagerWrap } from './atoms'

interface State {
  oven: ToastProps[]
}

export interface CreateToastReturn {
  addNotice: (option: ToastProps) => void
  destory: () => void
}

class ToastManager extends React.Component<{}, State> {
  public state: State = {
    oven: [],
  }

  add(option: ToastProps) {
    const key = `tost_${Date.now()}_${this.state.oven.length}`
    this.setState((prerState) => ({
      oven: [...prerState.oven, { ...option, key }],
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
    this.setState((prerState) => ({
      oven: prerState.oven.filter((option) => {
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
          {oven.map((option) => (
            <CSSTransition key={option.key} classNames='toast' timeout={300}>
              <Toast {...option} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ManagerWrap>
    )
  }
}

export const createToastManager = (): CreateToastReturn => {
  const ref = React.createRef<ToastManager>()
  const div = document.createElement('div')
  document.body.append(div)
  const root = ReactDOM.createRoot(div!)
  root.render(
    <AppThemeProvider>
      <ToastManager ref={ref} />
    </AppThemeProvider>
  )
  console.log(ref)

  return {
    addNotice(option: ToastProps) {
      return ref.current?.add(option)
    },
    destory() {
      root.unmount()
      document.body.removeChild(div)
    },
  }
}
