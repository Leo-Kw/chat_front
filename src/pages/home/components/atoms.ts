import styled, { css } from 'styled-components'

export const HeaderWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${theme.color.gray.border};
    height: 50px;
    width: 100%;
    padding: 0 10px;
  `}
`

export const MessageWrapper = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: relative;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: block;
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, 0.3);
  }
  &::-webkit-scrollbar-track {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, 0.1);
  }
`

export const MessageItem = styled.div<{ type: string }>`
  justify-content: ${({ type }) => (type === 'myself' ? 'flex-end' : 'flex-start')};
  flex-direction: row;
`

export const SendWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  width: 100%;
  padding: 0 10px;
`
