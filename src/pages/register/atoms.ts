import styled from 'styled-components'
import { typography, color } from '@/theme'

export const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -40px;
`

export const ControlButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
`

export const ControlButton = styled.button`
  font-size: ${typography.text};
  color: ${color.text.lighter};
  background: #0000;
  cursor: pointer;
`
