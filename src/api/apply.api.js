import { BaseCRUDApi, CRUDApi } from ".";

export default class TagAPI extends BaseCRUDApi {
  static instance = new CRUDApi("apply");
}
