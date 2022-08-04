import React from 'react'
import { BackgroundImage, LocaleContainer, CurrentLanguage, Menu } from './atoms'
import intl from 'react-intl-universal'

interface props {
  children: React.ReactNode
}

export const Layout: React.FC<props> = ({ children }) => {
  return (
    <BackgroundImage>
      <LocaleContainer>
        <CurrentLanguage>{intl.get('language')}</CurrentLanguage>
        <Menu>asdads</Menu>
      </LocaleContainer>
      {children}
    </BackgroundImage>
  )
}
