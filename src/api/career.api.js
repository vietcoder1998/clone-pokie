import { BaseCRUDApi, CRUDApi } from ".";

export class CRUDCareerApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name
    }
    this.name = name;
  }
  
  async getAnotherCareerList() {
    return this.baseApi
      .get(`/${this.name}/random`)
  }
}

export default class CareerAPI extends BaseCRUDApi {
  static instance = new CRUDCareerApi('career');
}
