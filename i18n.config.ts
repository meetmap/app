import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import { en, ru } from "./translations";
import 'intl-pluralrules'

const resources = {
    en: {
        translation: en,
    },
    ru: {
        translation: ru,
    }
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v4',
        resources,
        //language to use if translations in user language are not available
        fallbackLng: "en",
        supportedLngs: ["en", "ru"],
        interpolation: {
            escapeValue: false, // Отключите экранирование строк, если используете реактивную версию i18next
        },
    });

export default i18n;