import { BaseCRUDApi, CRUDApi } from ".";
import { MODEL_NAME } from "../config/const";

export class CRUDSubscribeApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name;
    }
    this.name = name;
  }

  onValidateEmail(email, code) {
    return this.baseApi.post(`/${this.name}`, { email, code });
  }
}

export default class SubscribeAPI extends BaseCRUDApi {
  static instance = new CRUDSubscribeApi(MODEL_NAME.subscribe);
}
