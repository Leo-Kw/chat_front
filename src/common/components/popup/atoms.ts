import styled from 'styled-components'

export const PopupWrapper = styled.div<{
  width: number
  height: number
  left: number
  bottom: number
  padding: number | string
}>`
  position: absolute;
  width: ${({ width }) => width + 'px'};
  height: ${({ height }) => height + 'px'};
  left: ${({ left }) => left + 'px'};
  bottom: ${({ bottom }) => bottom + 'px'};
  z-index: 99;
  background: #252527;
  box-shadow: 0 0 8px #f2f2f2;
  border-radius: 5px;
  padding: ${({ padding }) => (typeof padding === 'number' ? padding + 'px' : padding)};
`
