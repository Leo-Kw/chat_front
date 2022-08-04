import styled from 'styled-components'
import shadows from '../theme/shadows'

export const BackgroundImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(http://112.74.127.146/picture/images/music/banner_111.a6be22c.gif);
  height: 100vh;
`

export const Menu = styled.div`
  width: 110px;
  height: 100px;
  position: absolute;
  right: 0;
  box-shadow: ${shadows[2]};
  border-radius: 4px;
  cursor: pointer;
  background: #0006;
  color: #999;
`

export const LocaleContainer = styled.div`
  position: absolute;
  right: 20px;
  width: 55px;
  top: 15px;
  cursor: pointer;
  :hover {
    ${Menu} {
      display: block;
    }
  }
`

export const CurrentLanguage = styled.div`
  color: #999;
  background: #fff0;
  :after {
    content: '';
    position: absolute;
    top: 45%;
    right: 2%;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #999;
  }
`
