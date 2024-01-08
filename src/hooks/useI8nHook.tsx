import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../components/layout/assets/en.json';
import heTranslation from '../components/layout/assets/he.json';


interface CustomInitOptions extends InitOptions {
  rtl?: boolean;
}
const resources = {
  en: { translation: enTranslation },
  he: { translation: heTranslation }
};

//adjust i18n library 
const i18nOptions: CustomInitOptions = {
  resources,
  lng: 'en', 
  interpolation: {
    escapeValue: false 
  },
  rtl: true
};

i18n.use(initReactI18next).init(i18nOptions);

export { i18n };
