import LocalStorageHandlerStatic from "./../local-storage.helper";

export class CheckPinJob {
  data = {};
  static instance = new CheckPinJob();
  constructor(data) {
    if (data) {
      this.data;
    }

    this.loadData();
  }

  loadData() {
    return LocalStorageHandlerStatic.getAsJSON("checkPinJob");
  }

  saveData() {
    return LocalStorageHandlerStatic.setAsJSON("checkPinJob", this.data);
  }

  getList() {
    return Object.keys(this.data);
  }

  onPin(id) {
    const time = new Date().getTime();

    this.data[id] = time;
    this.saveData();
  }

  onUnPin(id) {
    delete this.data[id];
    this.saveData();
  }

  onClickPin(id) {
    if (this.getList().includes(id)) {
      this.onUnPin(id);
    } else {
      this.onPin(id);
    }
  }
}
