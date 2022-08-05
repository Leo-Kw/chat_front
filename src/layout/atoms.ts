import { color, typography } from '@/theme'
import styled from 'styled-components'

const borderRadius = '5px'

export const BackgroundImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(http://112.74.127.146/picture/images/music/banner_111.a6be22c.gif);
  height: 100vh;
`

export const Menu = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-top: 10px;
`

export const LocaleContainer = styled.div`
  position: absolute;
  right: 40px;
  width: 90px;
  top: 15px;
  cursor: pointer;
  :hover {
    ${Menu} {
      display: block;
    }
  }
`

export const CurrentLanguage = styled.div`
  color: ${color.gray.heavy};
  background: #fff0;
  :after {
    content: '';
    position: absolute;
    top: 10px;
    right: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${color.gray.heavy};
  }
`

export const LanguageItem = styled.div<{ selected: boolean }>`
  text-align: center;
  width: 100px;
  height: 30px;
  line-height: 30px;
  font-size: ${typography.textSmall};
  background-color: ${({ selected }) => (selected ? color.gray.light : 'white')};
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  &:first-child {
    border-top-left-radius: ${borderRadius};
    border-top-right-radius: ${borderRadius};
  }
  &:last-child {
    border-bottom-right-radius: ${borderRadius};
    border-bottom-left-radius: ${borderRadius};
  }
`
