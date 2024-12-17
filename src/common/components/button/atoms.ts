import styled, { CssProps, css } from 'styled-components'
import { ButtonProps, ButtonType } from './types'

type ButtonCssProps = CssProps<ButtonProps>

const getButtonStyle = (type: ButtonProps['type'], theme: ButtonCssProps['theme']) => {
  switch (type) {
    case 'default':
      return css`
        color: ${theme.color.text.dark};
        background: ${theme.color.white};
        border: 1px solid ${theme.color.gray.border};
        &:hover {
          color: ${theme.color.button.main};
          border: 1px solid ${theme.color.button.main};
        }
      `
    case 'primary':
      return css`
        color: ${theme.color.text.lighter};
        background: ${theme.color.button.main};
        &:hover {
          filter: brightness(0.1);
        }
      `
    case 'text':
      return css`
        color: ${theme.color.text.dark};
        background: transparent;
        &:hover {
          background: ${theme.color.gray.background};
        }
      `
  }
}

export const ButtonComponent = styled.button<{ $buttonType: ButtonType; $color?: string }>`
  ${({ theme, $buttonType, $color }) => css`
    display: flex;
    align-items: center;
    font-size: ${theme.typography.textSmall};
    border: 0;
    padding: 5px 10px;
    border-radius: 4px;
    margin: 0 5px;
    transition: 0.2s;
    ${getButtonStyle($buttonType, theme)}
    ${$color &&
    css`
      color: ${$color};
    `}
    svg {
      /* fill: ${theme.color.text.gray}; */
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  `}
`
