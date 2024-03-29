import { LocalStorageHandler } from "./../local-storage";

export const SideBarKey = "side-handler";

export class SideBarHandler {
  localStorageHandler = new LocalStorageHandler();

  get data() {
    return this.localStorageHandler.getAsJSON(SideBarKey) ?? [];
  }

  set data(data) {
    return this.localStorageHandler.setAsJSON(SideBarKey, data);
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    const newData = this.data;
    newData[key] = value;

    this.data = newData;
  }

  add(value) {
    if (this.data && this.data.length && !this.data.includes(value)) {
      const newData = this.data ?? [];
      newData.push(value);

      this.data = newData;
    } else {
      this.data = [value];
    }
  }

  find(key) {
    const findKeys = (this.data ?? []).filter((item) =>
      item?.toLowerCase().includes(key.toLowerCase())
    );

    return findKeys;
  }

  remove(key) {
    const newData = this.data?.filter((item) => item !== key);

    return newData;
  }
}
