import React from 'react'
import { BackgroundImage, LocaleContainer, CurrentLanguage, Menu, LanguageItem } from './atoms'
import { Locale, setLocaleService, getLocaleService } from '@/shared/services'
import { useBattery, useIntlLocale } from '../hook'
import { Icon } from '@/common/components'

interface props {
  children: React.ReactNode
}

const LocaleMap = new Map([
  [Locale.EN, { text: 'English' }],
  [Locale.ZH, { text: '简体中文' }],
])

export const Layout: React.FC<props> = ({ children }) => {
  const locale: Locale = getLocaleService()
  const { isSupported, fetched, level, charging } = useBattery()
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
      {isSupported && fetched && (
        <div className='absolute right-[160px] top-[16px] h-[20px] w-[50px] rounded-[4px] border-[1px] border-gray-heavy bg-gray-background p-[1px] after:absolute after:right-[-3px] after:top-1/2 after:h-[4px] after:w-[1px] after:-translate-y-1/2 after:bg-gray-heavy after:content-[""]'>
          <div
            className='h-full rounded-[2px] bg-gray-heavy'
            style={{ width: `${level * 100}%` }}
          ></div>
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center fill-white text-[12px] font-semibold text-white'>
            {level * 100}
            {charging && <Icon type='lightning' style={{ width: '14px', height: '14px' }} />}
          </div>
        </div>
      )}
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
