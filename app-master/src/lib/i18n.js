import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ta: {
    translation: {
      Customer: 'வாடிக்கையாளர்',
      cook: 'சமையற்காரர்',
      loginAs: 'உள்நுழைக',
      info_title: 'சமைக்க விரும்பும் ஒரு சமையல்காரரை பதிவு செய்யுங்கள்',
      info_description: 'ஒரு சமையலறை ஊழியர்களிடையே ஒரு பிணைப்பு இருக்கிறது, நான் நினைக்கிறேன். நீங்கள் உங்கள் சொந்த குடும்பத்துடன் செய்வதை விட சமையலறையில் உங்கள் சமையல்காரருடன் அதிக நேரம் செலவிடுகிறீர்கள். ~ கார்டன் ராம்சே'
    }
  },
  en: {
    translation: {
      Customer: 'Customer',
      cook: 'Cook',
      loginAs: 'Login as',
      info_title: 'Book A Cook \nWho Love To Cook',
      info_description: 'There’s a bond among a kitchen staff, I think. You spend more time with your chef in the kitchen than you do with your own family. ~ Gordon Ramsay.'
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    cleanCode: true,
    keySeparator: '.'
  })

export default i18n
