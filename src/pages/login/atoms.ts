import styled from 'styled-components'
import { color, typography } from '@/theme'

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -300px;
`

export const ControlButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const ControlButton = styled.button`
  font-size: ${typography.text};
  color: ${color.text.lighter};
  background: #0000;
  cursor: pointer;
`
