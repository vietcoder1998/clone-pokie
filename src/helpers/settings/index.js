

export class SettingHandler {
  _data = {
    copy_ui: {},
  };

  get copyUI() {
    return this._data.copy_ui;
  }

  set copyUI(value) {
    this._data.copy_ui = value;
  }

  getInput(key) {
    return this.copyUI[key];
  }

  setInput(key, value) {
    const newCopyUI = this.copyUI;

    this.copyUI = { ...newCopyUI, [key]: value };

    return this.copyUI;
  }

  remove(key) {
    const newCopyUI = this.copyUI;
    newCopyUI[key] = "";

    this.copyUI = newCopyUI;
  }
}
