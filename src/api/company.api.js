import { BaseCRUDApi, CRUDApi } from ".";

export class CRUDCompanyApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name;
    }
    this.name = name;
  }

  async getAnotherCompanyList() {
    return this.baseApi.get(`/${this.name}/random`);
  }
}

export default class CompanyAPI extends BaseCRUDApi {
  static instance = new CRUDCompanyApi("company");
}
