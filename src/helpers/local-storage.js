export class LocalStorageHandler {
  get(name) {
    return localStorage.getItem(name);
  }

  getAsJSON(name) {
    return JSON.parse(this.get(name));
  }
  remove(name) {
    return localStorage.removeItem(name);
  }

  set(name, value) {
    return localStorage.setItem(name, value);
  }

  setAsJSON(name, value) {
    return this.set(name, JSON.stringify(value));
  }

  updateString(name, value) {
    return this.set(name, value);
  }

  updateObject(name, value) {
    return this.setAsJSON(name, value);
  }
}
