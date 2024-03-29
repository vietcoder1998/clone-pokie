import { BaseCRUDApi, CRUDApi } from ".";

export class CRUDAuthenticateApi extends CRUDApi {
  constructor(name) {
    super(name);
    if (name) {
      this.name = name;
    }
    this.name = name;
  }
  async getRandom() {
    return await this.baseApi.get(`/${this.name}/random`);
  }

  async loginWithGoogle(body) {
    return this.baseApi.post(`/${this.name}/google`, body);
  }

  async logout(userId) {
    const data = await this.baseApi.put(`/authenticate/logout`, { userId });

    return data;
  }

  async login(email, password) {
    const data = await this.baseApi.post(`/authenticate/login`, {
      email,
      password,
    });

    return data;
  }

  async register(firstName, lastName, email, password) {
    const data = await this.baseApi.post(`/authenticate/register`, {
      firstName,
      lastName,
      email,
      password,
    });

    return data;
  }

  async forgetPassword(email, code) {
    const data = await this.baseApi.get(
      `/authenticate/request-new-password?email=${email}`
    );

    return data;
  }

  async unlockAccount(email, code) {
    const data = await this.baseApi.get(
      `/authenticate/unlock-account?email=${email}&code=${code}`
    );

    return data;
  }

  async appendNewPassword(email, token, password, rePassword) {
    const data = await this.baseApi.post(
      `/authenticate/append-new-password`,
      {
        token: token,
        email: email,
        password: password,
        rePassword: rePassword
      }
    );

    return data;
  }

}

export default class AuthenticateAPI extends BaseCRUDApi {
  static instance = new CRUDAuthenticateApi("authenticate");
}
