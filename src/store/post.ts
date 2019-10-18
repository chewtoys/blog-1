import * as next from 'next';
import Api from '../lib/api';

interface ISetReducerPayload {
  id: number;
  post: IGithubIssue;
}

export default {
  state: {
    posts: {},
  },
  reducers: {
    set(state: any, payload: ISetReducerPayload) {
      const { id, post } = payload;
      return {
        ...state,
        posts: {
          ...state.posts,
          [id]: post,
        },
      };
    },
  },
  effects: {
    async getAsync(payload: { ctx?: next.NextPageContext; id: number }) {
      const { ctx, id } = payload;
      const post: IGithubIssue = await Api.create(ctx).post(id);
      return this.set({ id, post });
    },
  },
};
