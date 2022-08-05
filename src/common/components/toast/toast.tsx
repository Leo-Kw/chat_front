import { Icon } from '../icon'
import { ToastType, ToastStyled } from './atoms'

export interface ToastProps {
  /** 设置Toast内容 */
  content: string
  /** 设置Toast持续时间 */
  duration: number

  key?: string
  /** 设置Toast类型
   *  @type 'info' | 'warn' | 'success' | 'error' | 'loading'
   */
  type: ToastType
  /** 设置Toast关闭时的回调 */
  onClose?: () => void
}

export const Toast = ({ content, type }: ToastProps) => {
  return (
    <ToastStyled type={type}>
      <Icon type={type} />
      {content}
    </ToastStyled>
  )
}
