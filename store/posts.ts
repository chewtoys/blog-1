import * as next from 'next';
import Api from '../lib/api';

export default {
  state: {
    nodes: [],
    pageInfo: {},
  },
  reducers: {
    loadPosts(state: any, payload: IGithubIssues) {
      const { nodes, pageInfo } = payload;
      return {
        ...state,
        pageInfo,
        nodes: [...state.nodes, ...nodes],
      };
    },
    refreshPosts(state: any, payload: IGithubIssues) {
      const { nodes, pageInfo } = payload;
      return {
        ...state,
        pageInfo,
        nodes,
      };
    },
  },
  effects: {
    async getPosts(payload: { ctx?: next.NextPageContext; cursor?: string }) {
      const { ctx, cursor } = payload;
      const posts: IGithubIssues = await Api.create(ctx).posts(cursor);

      if (cursor) {
        return this.loadPosts(posts);
      }
      return this.refreshPosts(posts);
    },
  },
};
