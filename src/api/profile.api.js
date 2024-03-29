import { BaseCRUDApi, CRUDApi } from ".";
import { MODEL_NAME } from "../config/const";

export class CRUDProfileApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name;
    }
    this.name = name;
  }

  getProfileByUserId(userId) {
    return this.baseApi.get({ userId: userId})
  }
}

export default class ProfileAPI extends BaseCRUDApi {
  static instance = new CRUDProfileApi(MODEL_NAME.profile);
}
