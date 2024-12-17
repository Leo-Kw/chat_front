import React from 'react'
import { Locale, setLocaleService, getLocaleService } from '../shared/services'
import { useBattery, useIntlLocale } from '../hook'
import { Icon } from '../common/components'
import backgroundImage from '../common/images/banner_111.gif'

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
    <div
      className='flex h-screen items-center justify-center bg-auto'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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
      <div className='group absolute right-10 top-4 w-fit cursor-pointer'>
        <div className='bg-[#fff0] pr-5 text-gray-heavy after:absolute after:right-1 after:top-2.5 after:border-4 after:border-b-0 after:border-solid after:border-transparent after:border-t-gray-heavy after:content-[""]'>
          {t('language')}
        </div>
        <div className='absolute right-2.5 mt-2.5 h-full w-full cursor-pointer opacity-0 transition-all duration-500 hover:pointer-events-auto group-hover:opacity-100'>
          {getSurplusLocale(locale).map((item, index) => (
            <div
              key={index}
              className={`h-8 w-28 text-center text-sm leading-7 first:rounded-t last:rounded-b ${
                item === locale ? 'bg-gray-light font-bold' : 'bg-white font-normal'
              }`}
              onClick={() => handleClick(item)}
            >
              <span>{LocaleMap.get(item)?.text}</span>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}
