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
  ${baseFlex}
  width: 1280px;
  height: 720px;
  background: #fff8;
  border-radius: 5px;
`
