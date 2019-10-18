import * as next from 'next';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import _ from 'lodash/fp';

class Api {
  static create(ctx?: next.NextPageContext) {
    const config: AxiosRequestConfig = {};
    if (ctx && ctx.req) {
      const { headers = {} } = ctx.req;
      if (process.env.NODE_ENV === 'development') {
        config.baseURL = `http://${headers['x-forwarded-host']}`;
      } else {
        config.baseURL = `https://${headers['x-now-deployment-url']}`;
      }
    }

    return new Api(config);
  }

  private request: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.request = axios.create(config);
  }

  async posts(cursor?: string): Promise<IGithubIssues> {
    const params = _.pickBy(_.identity, { cursor });
    const { data } = await this.request.get('/api/posts', { params });
    return data;
  }

  async recommend(): Promise<IGithubIssues> {
    const { data } = await this.request.get('/api/recommend');
    return data;
  }

  async labels(): Promise<IGithubLabels> {
    const { data } = await this.request.get('/api/labels');
    return data;
  }

  async post(id: number): Promise<IGithubIssue> {
    const params = { id };
    const { data } = await this.request.get('/api/post', { params });
    return data;
  }

  async archives({ cursor, label }: { cursor?: string; label?: string | undefined }): Promise<IGithubIssues> {
    const params = _.pickBy(_.identity, { cursor, label });
    const { data } = await this.request.get('/api/archives', { params });
    return data;
  }

  async about(): Promise<IGithubIssue> {
    const { data } = await this.request.get('/api/about');
    return data;
  }
}

export default Api;
