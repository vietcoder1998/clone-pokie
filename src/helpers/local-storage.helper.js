export default class LocalStorageHandlerStatic {
  static get(name) {
    if (typeof window !== "undefined") {
      // Chỉ truy cập localStorage khi chạy trên client-side
      return localStorage.getItem(name) ?? "";
    }

    return;
  }

  static getAsJSON(name) {
    return this.get(name) ? JSON.parse(this.get(name)) : null;
  }
  static remove(name) {
    if (typeof window !== "undefined") {
      // Chỉ truy cập localStorage khi chạy trên client-side
      localStorage.removeItem(name);
    }
  }

  static set(name, value) {
    if (typeof window !== "undefined") {
      // Chỉ truy cập localStorage khi chạy trên client-side
      localStorage.setItem(name, value);
    }
  }

  static setAsJSON(name, value) {
    if (typeof window !== "undefined") {
      // Chỉ truy cập localStorage khi chạy trên client-side
      this.set(name, JSON.stringify(value));
    }
  }

  static updateString(name, value) {
    return this.set(name, value);
  }

  static updateObject(name, value) {
    return this.setAsJSON(name, value);
  }
}
