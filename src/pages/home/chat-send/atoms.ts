import styled, { css } from 'styled-components'

export const SendWrapper = styled.div`
  display: flex;
  height: 200px;
  width: 100%;
  padding: 0 12px;
  flex-direction: column;
`
export const SendHeader = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  ::after {
    content: '';
    width: 100%;
    height: 0.5px;
    background: ${({ theme }) => theme.color.gray.border};
    position: absolute;
    top: 0px;
  }
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

export const EmojiWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const EmojiItem = styled.div`
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  :hover {
    background: ${({ theme }) => theme.color.gray.main};
  }
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
