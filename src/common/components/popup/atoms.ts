import styled from 'styled-components'

export const PopupWrapper = styled.div<{
  width: number
  height: number
  left: number
  bottom: number
}>`
  position: absolute;
  width: ${({ width }) => width + 'px'};
  height: ${({ height }) => height + 'px'};
  left: ${({ left }) => left + 'px'};
  bottom: ${({ bottom }) => bottom + 'px'};
  z-index: 99;
  background: #373741;
  border-radius: 5px;
  padding: 10px;
`
