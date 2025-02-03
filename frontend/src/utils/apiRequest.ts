import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type RequestConfig = AxiosRequestConfig;
/* eslint-disable @typescript-eslint/no-explicit-any */
const responseErrorHandler = (error: any) => {
  return Promise.reject(error.response?.data);
};

export class ApiRequestInstance {
  instance: AxiosInstance;
  token?: string;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
      function (request: any) {
        return request;
      },
      function (error: any) {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => responseErrorHandler(error)
    );
  }

  getRequest = (url: string, params: unknown = {}, other?: RequestConfig) => {
    return this.instance
      .get(url, { ...other, params })
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };

  postRequest = (url: string, body?: unknown, other?: RequestConfig) => {
    return this.instance
      .post(url, body, other)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };

  updateRequest = (url: string, body?: unknown, other?: RequestConfig) => {
    return this.instance
      .put(url, body, other)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };

  patchRequest = (url: string, body?: unknown, other?: RequestConfig) => {
    return this.instance
      .patch(url, body, other)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };

  putRequest = (url: string, body?: unknown, other?: RequestConfig) => {
    return this.instance
      .put(url, body, other)
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };

  deleteRequest = (url: string, body?: unknown, other?: RequestConfig) => {
    return this.instance
      .delete(url, { ...other, data: body })
      .then(({ data }) => data)
      .catch((err) => {
        throw err;
      });
  };
}
