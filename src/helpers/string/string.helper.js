import { Buffer } from "buffer";

export default class StringHelper {
  static instance = new StringHelper();

  base64toString(str) {
    return Buffer.from(String(str), "base64").toString("utf-8");
  }

  stringToBase64(str) {
    return Buffer.from(String(str), "utf8").toString("base64");
  }

  jsonToBase64(json) {
    const strJSON = JSON.stringify(json);

    return this.stringToBase64(strJSON);
  }

  base64ToJSON(base64) {
    if (!base64) {
      return {};
    }

    const strJSON = Buffer.from(base64, "base64").toString("utf-8");

    if (!strJSON) {
      return {};
    }

    return JSON.parse(strJSON);
  }
}
