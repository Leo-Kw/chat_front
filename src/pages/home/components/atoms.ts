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
    padding: 0 10px;
  `}
`

export const HeaderTitle = styled.div`
  ${flexRowBase}
`

export const HeaderControl = styled.div`
  ${flexRowBase}
`

export const MessageWrapper = styled.div`
  flex: 1;
  position: relative;
`

export const MessageContent = styled.div`
  flex: 1;
  height: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
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
  height: 200px;
  width: 100%;
  padding: 0 12px;
  flex-direction: column;
`
export const SendHeader = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
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

export const SendTextarea = styled.textarea.attrs((props) => ({
  placeholder: props.placeholder,
}))`
  ${({ theme }) => css`
    width: 100%;
    height: calc(100% - 80px);
    overflow: hidden;
    box-sizing: border-box;
    resize: none;
    outline: none;
    border: none;
    font-size: 15px;
    color: ${theme.color.text.gray};
    background-color: transparent;
  `}
`

export const SendFooter = styled.div`
  height: 30px;
  width: 100%;
`
