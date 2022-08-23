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
  display: flex;
  flex-direction: column;
  width: 1580px;
  height: 660px;
  background: #fff0;
  box-shadow: 0 0 15px #f2f2f2;
  border-radius: 10px;
`
