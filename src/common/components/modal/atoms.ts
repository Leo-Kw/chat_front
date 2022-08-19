import styled, { css } from 'styled-components'

const baseFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const basePositionZero = css`
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`

export const StyledModal = styled.div<{ zIndex: number; visible: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
  visibility: ${(p) => (p.visible ? 'visible' : 'hidden')};
  z-index: ${(p) => p.zIndex};
`

export const Mask = styled.div`
  ${basePositionZero}
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: rgba(0, 0, 0, 0.4);
  transition: opacity 300ms;
`

export const ModalStyle = styled.div<{ zIndex: number; visible: boolean }>`
  ${baseFlex}
  ${basePositionZero}
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  visibility: ${(p) => (p.visible ? 'visible' : 'hidden')};
  z-index: ${(p) => p.zIndex};
`

export const Content = styled.div<{
  top?: string
  right?: string
  left?: string
  bottom?: string
  minWidth?: string | number
  backgroundColor?: string
}>`
  ${({ theme, top, right, left, bottom, minWidth, backgroundColor }) => css`
    position: absolute;
    top: ${top ?? 'unset'};
    right: ${right ?? 'unset'};
    left: ${left ?? 'unset'};
    bottom: ${bottom ?? 'unset'};
    background: ${backgroundColor ? backgroundColor : theme.color.white};
    min-width: ${minWidth ? (typeof minWidth === 'number' ? minWidth + 'px' : minWidth) : '420px'};
    transition: all 300ms;
    border-radius: ${theme.radius.sm};
    box-shadow: 0px 10px 16px 4px rgba(102, 102, 102, 0.2);
  `}
`

export const CloseIconWrap = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 300ms;
    border-radius: 0 ${theme.radius.sm} 0 0;
    :hover {
      background: ${theme.color.background};
    }
    svg {
      width: 16px;
      height: 16px;
    }
  `}
`

export const Header = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: 0 20px;
    color: ${theme.color.text.darkest};
    font-size: ${theme.typography.textSmall};
    font-weight: 600;
    line-height: 1;
    padding: 14px;
    border-radius: 2px 2px 0 0;
  `}
`

export const Main = styled.div`
  padding: 20px;
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  button + button {
    margin-left: 20px;
  }
  border-radius: 0 0 2px 2px;
  padding: 10px 20px 20px;
`

export const ModalButton = styled.button<{ variant: 'contained' | 'outlined' }>`
  ${({ theme, variant }) => css`
    padding: 4px 16px;
    border-radius: 4px;
    color: ${variant === 'outlined' ? theme.color.text.darkest : theme.color.text.lighter};
    background: ${variant === 'outlined' ? theme.color.white : theme.color.button.main};
    ${variant === 'outlined' && `border: 1px solid ${theme.color.gray.light}`};
    font-size: ${theme.typography.textSmall};
    transition: 300ms;
    :hover {
      background: ${variant === 'outlined' ? theme.color.white : theme.color.button.hoverMain};
      ${variant === 'outlined' &&
      `color: ${theme.color.button.main}; border: 1px solid ${theme.color.button.main};`};
    }
  `}
`
