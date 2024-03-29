import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { LocalStorageVariable } from "../config/const";

const MultipleLanguage = {
  EN: "en",
  VI: "vi",
};
const LANGUAGE_DEFAULT = MultipleLanguage.VI;

/**
 * Bootstrap JSON files
 * @returns JSON object
 */
const loadJsonFiles = () => {
  const files = require.context("./json", false, /\.json$/);
  const data = {};
  files.keys().forEach((key) => {
    const fileName = key.replace(/(\.\/|\.json)/g, "");
    data[fileName] = { translation: files(key) };
  });
  return data;
};

/**
 * Setup i18n
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: loadJsonFiles(),
    lng:
      typeof window !== "undefined"
        ? (window.localStorage ?? { getItem: () => {} })?.getItem(
            LocalStorageVariable.i18nLang
          )
        : MultipleLanguage.VI,
    fallbackLng: [LANGUAGE_DEFAULT],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    compatibilityJSON: "v3",
  });

export default i18n;
