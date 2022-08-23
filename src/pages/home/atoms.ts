import styled, { css } from 'styled-components'

const baseFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const HomeWrapper = styled.div`
  ${baseFlex}
`

export const ChatWrapper = styled.div`
  position: fixed;
  left: 12%;
  right: 12%;
  top: 8%;
  bottom: 8%;
  background: #fff0;
  box-shadow: 0 0 15px #f2f2f2;
  border-radius: 10px;
`
