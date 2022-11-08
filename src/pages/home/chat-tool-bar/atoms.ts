import styled from 'styled-components'

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
