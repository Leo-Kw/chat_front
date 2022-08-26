const path = require('path')
const fs = require('fs')

const Zh = require('./zh')
const En = require('./en')

const I18N_LOCALE = ['zh', 'en']

const localeMap = new Map([
  ['zh', Zh],
  ['en', En],
])

export const exportToJson = () => {
  I18N_LOCALE.forEach((lang) => {
    fs.writeFileSync(
      `${path.resolve(__dirname, 'locales')}/${lang}.json`,
      JSON.stringify(localeMap.get(lang)),
      'utf-8'
    )
  })
}

exportToJson()
