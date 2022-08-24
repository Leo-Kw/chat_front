import styled, { css } from 'styled-components'
import { color, typography } from '@/theme'

const MarginBase = css`
  margin-bottom: 24px;
`

const EyeBase = css`
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  top: 10px;
  fill: ${color.gray.main};
  transition: 0.2s;
  :hover {
    cursor: pointer;
    fill: ${color.dark.dark};
  }
`

export const ChickMusicImg = styled.img.attrs(() => ({
  src: 'http://112.74.127.146/picture/images/music/songs-feel-good.gif',
}))`
  width: 100px;
  hegiht: auto;
`

export const LoginTitle = styled.div`
  text-align: center;
  font-size: ${typography.h5};
  color: ${color.text.lighter};
  margin-bottom: 30px;
`

export const FormContent = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
`

export const FormItem = styled.div`
  ${MarginBase};
  position: relative;
`

export const FormInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
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
  font-size: ${typography.textSmall};
  position: absolute;
  color: ${color.text.danger};
  margin: 0;
  :before {
    display: inline;
    content: '⚠ ';
  }
`

export const PasswordWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 10px;
    width: 20px;
    height: 20px;
    top: 10px;
    fill: ${color.gray.main};
    transition: 0.2s;
    :hover {
      cursor: pointer;
      fill: ${color.dark.dark};
    }
  }
`
