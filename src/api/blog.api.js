import { BaseCRUDApi, CRUDApi } from ".";

export class CRUDBlogApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name
    }
    this.name = name;
  }
  
  async getAnotherBlogList() {
    return this.baseApi
      .get(`/${this.name}/random`)
  }
}

export default class BlogAPI extends BaseCRUDApi {
  static instance = new CRUDBlogApi("blog");
}
