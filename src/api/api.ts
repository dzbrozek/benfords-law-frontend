import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

import { DataSetResponse } from './types';

class API {
  static dataSets(): AxiosPromise<DataSetResponse[]> {
    return API.request({
      url: '/data-sets/',
      method: 'GET',
    });
  }

  static request<T = unknown>(config: AxiosRequestConfig): AxiosPromise<T> {
    return axios({
      ...config,
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      xsrfHeaderName: 'X-CSRFToken',
      xsrfCookieName: 'csrftoken',
    });
  }
}

export default API;
