export type ButtonType = 'primary' | 'default' | 'text'
export interface ButtonProps {
  type: 'primary' | 'default' | 'text'
  color?: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
