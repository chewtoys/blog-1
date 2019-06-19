
import * as next from 'next';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import _ from 'lodash/fp';

interface IPostFilterOptions {
  tag: string;
}

class Api {
  private request: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    this.request = axios.create(config);
  }

  static client() {
    return new Api();
  }

  static server(ctx: next.NextContext) {
    const { req } = ctx;

    let baseURL = req!.headers['x-now-deployment-url'] as string;
    if (process.env.NODE_ENV === 'development') {
      baseURL = req!.headers['referer'] as string;
    }
    return new Api({ baseURL });
  }

  async getPostsByPage(
    page: number = 1,
    // tslint:disable-next-line
    per_page: number = 15,
    filter?: IPostFilterOptions,
  ): Promise<IBlogPost[]> {
    const params = { page, per_page, ...filter };
    const res = await this.request.get('/api/posts', { params });
    return res.data as IBlogPost[];
  }

  // tslint:disable-next-line
  async getPostById(id: number): Promise<IBlogPost> {
    const params = { id };
    const res = await this.request.get('/api/post', { params });
    return res.data as IBlogPost;
  }

  async getRecommendPosts(): Promise<IBlogPost[]> {
    const res = await this.request.get('/api/recommend');
    return res.data as IBlogPost[];
  }

  async getAllTags(): Promise<string[]> {
    const res = await this.request.get('/api/tags');
    return res.data as string[];
  }

  async getPageContext(): Promise<IPageContextValue> {
    const [recommend, tags] = await Promise.all([
      this.getRecommendPosts(),
      this.getAllTags(),
    ]);

    return {
      recommend,
      tags,
    };
  }
}

export default Api;
