import * as next from 'next';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import _ from 'lodash/fp';

class Github {
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
    return new Github(config);
  }

  private request: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.request = axios.create(config);
  }

  async issues(cursor?: string) {
    const params = _.pickBy(_.identity, {
      cursor,
    });
    const { data } = await this.request.get('/api/github/issues', { params });
    return data;
  }

  async recommend() {
    const { data } = await this.request.get('/api/github/recommend');
    return data;
  }

  async labels() {
    const { data } = await this.request.get('/api/github/labels');
    return data;
  }

  async issue(id: number) {
    const params = { id };
    const { data } = await this.request.get('/api/github/issue', { params });
    return data;
  }
}

export default Github;
