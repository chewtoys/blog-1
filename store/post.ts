import * as next from 'next';
import Api from '../lib/api';

interface IGetReducerPayload {
  id: number;
  post: IGithubIssue;
}

export default {
  state: {
    posts: {},
  },
  reducers: {
    get(state: any, payload: IGetReducerPayload) {
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
      return this.get({ id, post });
    },
  },
};
