import { BaseCRUDApi, CRUDApi } from ".";

export class CRUDUserApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name;
    }
    this.name = name;
  }
  async login(token) {
    const data = await this.baseApi.post(`/authenticate/google`, { token });

    return data;
  }

  async logout(userId) {
    const data = await this.baseApi.put(`/authenticate/logout`, { userId });

    return data;
  }
}

export default class UseAPI extends BaseCRUDApi {
  static instance = new CRUDUserApi("user");
}
