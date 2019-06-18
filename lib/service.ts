import axios from 'axios';
import _ from 'lodash/fp';

interface IPostFilterOptions {
  tag: string;
}

const service = {
  async getPostsByPage(
    page: number = 1,
    // tslint:disable-next-line
    per_page: number = 15,
    filter?: IPostFilterOptions,
  ): Promise<IBlogPost[]> {
    const params = { page, per_page, ...filter };
    const res = await axios.get('/api/posts', { params });
    return res.data as IBlogPost[];
  },

  async getRecommendPosts(): Promise<IBlogPost[]> {
    const res = await axios.get('/api/recommend');
    return res.data as IBlogPost[];
  },

  // tslint:disable-next-line
  async getPostById(id: number): Promise<IBlogPost> {
    const params = { id };
    const res = await axios.get('/api/post', { params });
    return res.data as IBlogPost;
  },

  async getAllTags(): Promise<string[]> {
    const res = await axios.get('/api/tags');
    return res.data as string[];
  },

  async getPageContext(): Promise<IPageContextValue> {
    const [recommend, tags] = await Promise.all([
      service.getRecommendPosts(),
      service.getAllTags(),
    ]);

    return {
      recommend,
      tags,
    };
  },
};

export default service;
