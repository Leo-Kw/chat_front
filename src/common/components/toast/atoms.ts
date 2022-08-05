import styled, { css } from 'styled-components'
import { Keyframes } from '@/theme'

export type ToastType = 'info' | 'warn' | 'success' | 'error' | 'loading'

export const ManagerWrap = styled.div`
  position: fixed;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  touch-action: none;
  pointer-events: none;
  z-index: 10000;
`

export const ToastStyled = styled.div<{ type: ToastType }>`
  ${({ theme, type }) => {
    const iconColor = {
      info: theme.color.info,
      warn: theme.color.warning,
      success: theme.color.success,
      error: theme.color.error,
      loading: theme.color.primary,
    }[type]
    return css`
      background: white;
      color: ${theme.color.textDark};
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: ${theme.radius.sm};
      touch-action: none;
      text-align: center;
      margin: 10px 0;
      padding: 8px 18px;
      transition: all 300ms ease-out;
      display: flex;
      align-items: center;
      &.toast-enter {
        opacity: 0;
        transform: scale(0.2);
      }

      &.toast-enter-active {
        opacity: 1;
        transform: scale(1);
      }
      &.toast-exit {
        opacity: 1;
        transform: translateY(0);
      }

      &.toast-exit-active {
        opacity: 0;
        transform: translateY(-50%);
      }
      svg {
        margin-right: 8px;
        width: 18px;
        height: 18px;
        fill: ${iconColor};
        ${type === 'loading' &&
        css`
          animation: ${Keyframes.rotate} 1s linear infinite;
        `}
      }
    `
  }}
`
