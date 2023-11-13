export interface ModalProps {
  /** 是否显示 */
  visible: boolean
  /** Modal触发关闭的callback */
  onCancel?: () => void
  /** Modal触发确定的callback */
  onOk?: () => void
  destory?: () => void
  confirmLoading?: boolean
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean
  /** 设置标题文字 */
  title?: string | React.ReactNode
  /** 设置Modal距离顶部的高度 */
  top?: string
  right?: string
  left?: string
  bottom?: string
  /**
   *  设置取消按钮文字
   *  @default 取消
   */
  cancelText?: string
  /**
   *  设置确定按钮文字
   *  @default 确定
   */
  okText?: string
  /**
   * 设置Modal的z-index
   * @default 3000
   */
  zIndex?: number
  /**
   * 点击Mask是否可以关闭弹窗
   *  @default true
   */
  maskClosable?: boolean
  /**
   * 是否可以回车关闭弹窗
   */
  canEnterClose?: boolean
  /**
   * 设置是否显示footer
   *  @default false
   */
  footer?: React.ReactNode | boolean
  bodyStyle?: React.CSSProperties
  /**
   * 设置Modal的最小宽度
   *  @default false
   */
  width?: string | number

  hiddenCancelButton?: boolean

  children?: React.ReactNode
  okButtonProps?: Omit<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'ref'
  >
  backgroundColor?: string
}
