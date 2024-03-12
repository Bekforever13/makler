import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { qr, kr, ru } from './locales'

const lang = localStorage.getItem('makler_lang')

i18n.use(initReactI18next).init({
  resources: {
    qr,
    kr,
    ru,
  },
  lng: lang || 'ru',
  fallbackLng: lang || 'ru',
  react: { useSuspense: true },
  interpolation: { escapeValue: false },
})

export default i18n
