import { ButtonComponent } from './atoms'
import { ButtonProps } from './types'

export const Button = ({ type, color, children, ...props }: ButtonProps) => {
  return (
    <ButtonComponent {...props} $buttonType={type} $color={color}>
      {children}
    </ButtonComponent>
  )
}
