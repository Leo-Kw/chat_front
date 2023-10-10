import styled, { css } from 'styled-components'

export const SelectWrap = styled.div<{ active: boolean }>`
  ${({ theme, active }) => css`
    position: relative;
    font-size: 14px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 40px;
    color: #000;
    background: ${theme.color.select.background};
    border: none;
    border-radius: 4px;
    display: flex;
    transition: all 0.3s;
    user-select: none;
    border: ${active ? '1px solid rgb(77, 124, 247)' : '1px solid transparent'};
    :hover {
      background: ${theme.color.select.backgroundHover};
    }
  `}
`

export const SelectInput = styled.div<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  padding: 0 15px;
  color: ${({ theme }) => theme.color.text.main};
  font-size: ${({ theme }) => theme.typography.text};
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const OptionWrap = styled.div<{ width?: number; height?: number }>`
  ${({ theme, width }) => css`
    width: ${width ? `${width}px` : '100%'};
    background-color: ${theme.color.select.background};
    z-index: 10000;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;
    max-height: 180px;
    color: ${theme.color.text.main};
    overflow-y: auto;
    border: 1px solid ${theme.color.select.border};
    font-size: 14px;
    border-radius: 4px;
  `}
`

export const Option = styled.div<{ active: boolean }>`
  ${({ theme, active }) => css`
    cursor: pointer;
    padding: 0 12px;
    height: 40px;
    line-height: 40px;
    transition: all 0.3s;
    background-color: ${active ? theme.color.select.optionHover : 'unset'};
    :hover {
      background-color: ${theme.color.select.optionHover};
    }
  `}
`
