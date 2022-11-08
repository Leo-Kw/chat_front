import styled, { css } from 'styled-components'

const flexRowBase = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const HeaderWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${theme.color.gray.border};
    height: 50px;
    width: 100%;
    padding: 0 20px;
  `}
`

export const HeaderPieceWrapper = styled.div`
  ${flexRowBase}
`

export const HeaderTitle = styled.div`
  background: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.dark.main};
  box-shadow: 0 0 5px #f2f2f2;
  border-radius: 5px;
  padding: 3px 10px;
`

export const ChatButton = styled.button<{ typeKey: string }>`
  ${({ theme, typeKey }) => css`
    display: flex;
    align-items: center;
    font-size: ${theme.typography.textSmall};
    color: ${typeKey === 'send' ? theme.color.text.gray : theme.color.gray.light};
    border: 0;
    padding: 5px 10px;
    border-radius: 4px;
    margin: 0 5px;
    transition: 0.2s;
    :hover {
      background: ${theme.color.gray.background};
    }
    svg {
      fill: ${theme.color.text.gray};
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  `}
`
