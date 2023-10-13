export type PopupProps = {
  open?: boolean
  onOpenChange?: (visible: boolean) => void
  left: number
  bottom: number
  width?: number
  height?: number
  title?: string
  show?: boolean
  padding?: number | string
  children: React.ReactElement
  content: React.ReactElement
}
