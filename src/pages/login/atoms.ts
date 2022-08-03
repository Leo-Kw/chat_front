import styled from 'styled-components'
import { color } from '../../common/theme'

export const LoginWrapper = styled.div`
  display: flex;
`

export const FormContent = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
`

export const FormInput = styled.input`
  margin: 10px 0;
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  font-size: 14px;
`

export const FormOkButton = styled.button`
  color: ${color.text.lighter};
  width: 100%;
  height: 40px;
  background: #409eff;
  margin: 10px 0;
  border-radius: 4px;
`

export const FormErrorTip = styled.p`
  color: ${color.text.danger};
  :before {
    display: inline;
    content: '⚠ ';
  }
`

export const FormShowPassword = styled.img`
  src: ../../common/images/show_password.png;
`
