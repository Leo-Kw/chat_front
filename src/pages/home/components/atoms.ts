import { color } from '@/theme'
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

export const HeaderTitle = styled.div`
  ${flexRowBase}
`

export const HeaderControl = styled.div`
  ${flexRowBase}
`

export const MessageWrapper = styled.div`
  flex: 1;
  height: 0;
  position: relative;
`

export const MessageContent = styled.div`
  height: 100%;
  padding: 10px 25px;
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

export const MessageItem = styled.div<{ isMyself: boolean }>`
  display: flex;
  justify-content: ${({ isMyself }) => (isMyself ? 'flex-end' : 'flex-start')};
  flex-direction: row;
  color: ${color.text.lighter};
  margin: 10px 0;
`

export const MessageItemWrapper = styled.div<{ isMyself: boolean }>`
  display: flex;
  flex-direction: ${({ isMyself }) => (isMyself ? 'row-reverse' : 'row')};
`

export const MessageItemAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background: ${color.text.lighter};
`

export const MessageItemTextWrapper = styled.div<{ isMyself: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMyself }) => (isMyself ? 'flex-end' : 'flex-start')};
  margin: 0 15px;
`

export const MessageItemUserName = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.textSmall};
    margin-bottom: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 200px;
  `}
`

export const MessageItemContent = styled.div<{ isMyself: boolean }>`
  ${({ theme, isMyself }) => css`
    background: ${isMyself
      ? theme.color.messageBackground.myself
      : theme.color.messageBackground.other};
    color: ${theme.color.dark.main};
    border-radius: 5px;
    max-width: 350px;
    padding: 5px 15px;
    height: auto;
    position: relative;
    word-wrap: break-word;
    &::before {
      content: '';
      border: solid transparent;
      height: 0;
      position: absolute;
      width: 0;
      border-width: 5px;
      top: 12px;
    }
    ${isMyself
      ? css`
          &::before {
            left: 100%;
            border-left-color: ${theme.color.messageBackground.myself};
          }
        `
      : css`
          &::before {
            right: 100%;
            border-right-color: ${theme.color.messageBackground.other};
          }
        `}
  `}
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

export const SendFooter = styled.div`
  height: 30px;
  width: 100%;
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
    color: ${theme.color.text.lighter};
    background-color: transparent;
  `}
`
