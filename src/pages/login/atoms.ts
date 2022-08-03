import styled, { css } from 'styled-components'
import { color, typography } from '../../common/theme'

const MarginBase = css`
  margin: 10px 0;
`

export const LoginWrapper = styled.div``

export const LoginTitle = styled.div`
  text-align: center;
  font-size: ${typography.h4};
  color: ${color.text.lighter};
  margin-bottom: 30px;
`

export const FormContent = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
`

export const FormInput = styled.input`
  ${MarginBase};
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  font-size: ${typography.text};
`

export const FormOkButton = styled.button`
  color: ${color.text.lighter};
  width: 100%;
  height: 40px;
  background: ${color.button.main};
  ${MarginBase};
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  :hover {
    background: ${color.button.hoverMain};
  }
`

export const FormErrorTip = styled.p`
  color: ${color.text.danger};
  margin: 0;
  :before {
    display: inline;
    content: '⚠ ';
  }
`

export const ControlButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${MarginBase};
`

export const ControlButton = styled.button`
  font-size: ${typography.text};
  color: ${color.text.lighter};
  background: #0000;
  cursor: pointer;
`
