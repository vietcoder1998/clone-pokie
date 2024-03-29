import { BaseCRUDApi, CRUDApi } from ".";

export default class JobAPI extends BaseCRUDApi {
  static instance = new CRUDApi("job");
}
