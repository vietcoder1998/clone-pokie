import { BaseCRUDApi, CRUDApi } from ".";

export class CRUDPermissionApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name;
    }
    this.name = name;
  }
}

export default class PermissionAPI extends BaseCRUDApi {
  static instance = new CRUDPermissionApi("permission");
}
