import React from 'react'
import { BackgroundImage, LocaleContainer, CurrentLanguage, Menu, LanguageItem } from './atoms'
import { Locale, setLocaleService, getLocaleService } from '@/shared/services'
import { useIntlLocale } from '../hook'

interface props {
  children: React.ReactNode
}

const LocaleMap = new Map([
  [Locale.EN, { text: 'English' }],
  [Locale.ZH, { text: '简体中文' }],
])

export const Layout: React.FC<props> = ({ children }) => {
  const locale: Locale = getLocaleService()
  const t = useIntlLocale()

  const getSurplusLocale = (currentLocale: Locale) => {
    const surplusLocaleLists = [...LocaleMap.keys()].filter((key) => key !== currentLocale)
    return [currentLocale, ...surplusLocaleLists]
  }

  const handleClick = (locale: Locale) => {
    setLocaleService(locale)
  }

  return (
    <BackgroundImage>
      <LocaleContainer>
        <CurrentLanguage>{t('language')}</CurrentLanguage>
        <Menu>
          {getSurplusLocale(locale).map((item, index) => (
            <LanguageItem key={index} onClick={() => handleClick(item)} selected={item === locale}>
              <span>{LocaleMap.get(item)?.text}</span>
            </LanguageItem>
          ))}
        </Menu>
      </LocaleContainer>
      {children}
    </BackgroundImage>
  )
}
