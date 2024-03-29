import { LocalStorageVariable, MultiLanguage } from "../config/const";
import i18n from "../i18n";
import { LocalStorageHandler } from "./local-storage";

class I18nHelper {
  localStorageHandler = new LocalStorageHandler();

  static instance = new I18nHelper();

  getLanguage = () => {
    return this.localStorageHandler.get(LocalStorageVariable.i18nLang);
  };

  updateLanguage = (language) => {
    this.localStorageHandler.set(LocalStorageVariable.i18nLang, language);
    i18n.changeLanguage(language);
  };

  updateVietNamLanguage = () => {
    return this.updateLanguage(MultiLanguage.vi);
  };

  updateEnglishLanguage = () => {
    return this.updateLanguage(MultiLanguage.en);
  };

  onSwitchLanguage = () => {
    const language = this.localStorageHandler.get(
      LocalStorageVariable.i18nLang
    );

    if (language === MultiLanguage.vi) {
      this.updateEnglishLanguage();
    } else {
      this.updateVietNamLanguage();
    }

    window.location.reload();
  };
}

export default I18nHelper;
