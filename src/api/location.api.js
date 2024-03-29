import { BaseCRUDApi, CRUDApi } from ".";

export default class LocationAPI extends BaseCRUDApi {
  static instance = new CRUDApi("location");
}
