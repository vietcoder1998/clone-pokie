import axios from "axios";
import { toast } from "react-toastify";
import CookieHelper from "../helpers/cookie/cookie.helpers";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    toast.error(response?.data?.response?.data?.message);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export class BaseAPI {
  static get instance() {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CookieHelper.instance.getToken()}`,
        "v-blog-uid": `${CookieHelper.instance.getUserId()}`,
        'Access-Control-Allow-Headers': '*'
      },
    });
  }

  get(...args) {
    return BaseAPI.instance
      .get(...args)
      .catch((data) => toast.error(data?.response?.data?.message));
  }
  post(...args) {
    return BaseAPI.instance
      .post(...args)
      .catch((data) => toast.error(data?.response?.data?.message));
  }
  put(...args) {
    return BaseAPI.instance
      .put(...args)
      .catch((data) => toast.error(data?.response?.data?.message));
  }
  delete(...args) {
    return BaseAPI.instance
      .delete(...args)
      .catch((data) => toast.error(data?.response?.data?.message));
  }
  patch(...args) {
    return BaseAPI.instance
      .patch(...args)
      .catch((data) => toast.error(data?.response?.data?.message));
  }
}

export class CRUDApi {
  baseApi = new BaseAPI();

  constructor(name) {
    this.name = name;
  }

  getList(config) {
    const query = config?.query;

    return this.baseApi
      .get(`/${this.name}${query ?? ""}`, config)
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        throw error;
      });
  }
  search(query, config) {
    const apiValues = Object.values(
      config ?? {
        data: {},
        headers: {},
      }
    );

    return this.baseApi
      .post(`/${this.name}/search?${query ?? ""}`, ...apiValues)
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        throw error;
      });
  }

  filterWithTag(query, data) {
    return this.baseApi
      .post(`/${this.name}/tag${query ?? ""}`, data)
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        throw error;
      });
  }
  getDetail(id) {
    return this.baseApi.get(`/${this.name}/${id}`).catch((error) => {
      toast.error(error?.response?.data?.message);
      throw error;
    });
  }
  update(id, body) {
    return this.baseApi.patch(`/${this.name}/${id}`, body).catch((error) => {
      toast.error(error?.response?.data?.message);
      throw error;
    });
  }
  create(body) {
    return this.baseApi.post(`/${this.name}`, body).catch((error) => {
      toast.error(error?.response?.data?.message);
      throw error;
    });
  }
  delete(id) {
    return this.baseApi.delete(`/${this.name}/${id}`).catch((error) => {
      toast.error(error?.response?.data?.message);
      throw error;
    });
  }
  batchUpdate(query, data, config) {
    return this.baseApi
      .patch(`/${this.name}?${query}`, ...[data, config])
      .catch((error) => {
        toast.error(data?.response?.data?.message);
        throw error;
      });
  }
  batchDelete(data, config) {
    return this.baseApi
      .delete(`/${this.name}`, ...[data, config])
      .catch((error) => {
        toast.error(data?.response?.data?.message);
        throw error;
      });
  }
}

export class BaseCRUDApi {
  crudApi = new CRUDApi();

  constructor(name, crudApi) {
    if (crudApi) {
      this.crudApi = crudApi;
    }

    this.crudApi.name = name;
  }

  get(...args) {
    return this.crudApi.get(...args);
  }
  getList(...args) {
    return this.crudApi.getList(...args);
  }

  getDetail(...args) {
    return this.crudApi.getDetail(...args);
  }

  update(...args) {
    return this.crudApi.update(...args);
  }

  batchUpdate(...args) {
    return this.crudApi.batchUpdate(...args);
  }

  create(...args) {
    return this.crudApi.create(...args);
  }
}
