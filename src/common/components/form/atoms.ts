import styled, { css } from 'styled-components'
import { color, typography } from '../../../theme'
import chickMusicImg from '../../images/songs-feel-good.gif'

const MarginBase = css`
  margin-bottom: 24px;
`

export const ChickMusicImg = styled.img.attrs(() => ({
  src: chickMusicImg,
}))`
  width: 100px;
  height: auto;
`

export const LoginTitle = styled.div`
  text-align: center;
  font-size: ${typography.h4};
  color: ${color.text.lighter};
  font-weight: bold;
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
  ${({ theme }) => css`
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: none;
    padding: 10px 15px;
    font-size: ${theme.typography.text};
    background: ${theme.color.input.background};
    transition: all 0.3s;
    color: ${theme.color.text.main};
    :hover {
      background: ${theme.color.input.backgroundHover};
    }
    :focus {
      outline: none !important;
      border: 1px solid ${theme.color.input.border};
      background: ${theme.color.input.backgroundFocus};
    }
  `}
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
