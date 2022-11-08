import { color } from '@/theme'
import styled, { css } from 'styled-components'

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
  position: relative;
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

export const UnreadTip = styled.div`
  position: absolute;
  right: 15px;
  bottom: 10px;
  padding: 7px 13px;
  font-size: 12px;
  background: ${({ theme }) => theme.color.warning};
  color: ${({ theme }) => theme.color.white};
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  &.show-enter {
    opacity: 0;
    transform: translateY(50%);
  }
  &.show-enter-active {
    opacity: 1;
    transform: translateY(0%);
    transition: opacity 300ms, transform 300ms;
  }
  &.show-exit {
    opacity: 1;
    transform: translateY(0);
  }
  &.show-exit-active {
    opacity: 0;
    transform: translateY(50%);
    transition: opacity 300ms, transform 300ms;
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
