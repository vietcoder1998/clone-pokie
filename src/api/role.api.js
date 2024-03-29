import { BaseCRUDApi, CRUDApi } from ".";

export class CRUDRoleApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name;
    }
    this.name = name;
  }
}

export default class UseAPI extends BaseCRUDApi {
  static instance = new CRUDRoleApi("role");
}
