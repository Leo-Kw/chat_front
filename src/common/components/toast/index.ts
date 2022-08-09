import { createToastManager } from './manager'
import { ToastProps } from './toast'
import { CreateToastReturn } from './manager'

let toastManager: CreateToastReturn | null = null
export const notice = (notice: ToastProps) => {
  if (!toastManager) {
    toastManager = createToastManager()
  }
  return toastManager.addNotice(notice)
}

const Toast = {
  info(content = '', duration = 3000, onClose?: () => void) {
    return notice({ content, type: 'info', duration, onClose })
  },
  success(content = '', duration = 3000, onClose?: () => void) {
    return notice({ content, type: 'success', duration, onClose })
  },
  warn(content = '', duration = 3000, onClose?: () => void) {
    return notice({ content, type: 'warn', duration, onClose })
  },
  error(content = '', duration = 3000, onClose?: () => void) {
    return notice({ content, type: 'error', duration, onClose })
  },
  loading(content = '', duration = 0, onClose?: () => void) {
    return notice({ content, type: 'loading', duration, onClose })
  },
}

export default Toast
