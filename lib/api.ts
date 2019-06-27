import * as next from 'next';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import _ from 'lodash/fp';

class Api {
  static createWithContext(ctx?: next.NextContext) {
    const config: AxiosRequestConfig = {};
    if (ctx && ctx.req) {
      const { headers } = ctx.req;
      if (process.env.NODE_ENV === 'development') {
        config.baseURL = `http://${headers['x-forwarded-host']}`;
      } else {
        config.baseURL = `https://${headers['x-now-deployment-url']}`;
      }
    }

    console.log(config);
    return new Api(config);
  }

  private request: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.request = axios.create(config);
  }

  async posts(cursor?: string) {
    const params = _.pickBy(_.identity, { cursor });
    const { data } = await this.request.get('/api/posts', { params });
    return data;
  }

  async recommend() {
    const { data } = await this.request.get('/api/recommend');
    return data;
  }

  async labels() {
    const { data } = await this.request.get('/api/labels');
    return data;
  }

  async post(id: number) {
    const params = { id };
    const { data } = await this.request.get('/api/post', { params });
    return data;
  }
}

export default Api;
