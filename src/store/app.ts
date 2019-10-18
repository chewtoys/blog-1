import * as next from 'next';
import Api from '../lib/api';

export default {
  state: {
    posts: {},
    recommend: {},
    labels: [],
    archives: {},
    about: {},
  },
  reducers: {
    setPosts(state: any, payload: any) {
      const { posts } = payload;
      return {
        ...state,
        posts,
      };
    },

    addPosts(state: any, payload: any) {
      const { posts } = payload;
      const { nodes, pageInfo } = posts;
      return {
        ...state,
        posts: {
          nodes: [...state.posts.nodes, ...nodes],
          pageInfo,
        },
      };
    },

    setRecommend(state: any, payload: any) {
      const { posts } = payload;
      return {
        ...state,
        recommend: posts,
      };
    },

    setLabels(state: any, payload: any) {
      const { labels } = payload;
      return {
        ...state,
        labels,
      };
    },

    setArchives(state: any, payload: any) {
      const { label, posts } = payload;
      const { archives } = state;
      return {
        ...state,
        archives: {
          ...archives,
          [label]: posts,
        },
      };
    },

    addArchives(state: any, payload: any) {
      const { label, posts } = payload;
      const { nodes, pageInfo } = posts;
      const { archives } = state;
      return {
        ...state,
        archives: {
          ...archives,
          [label]: {
            nodes: [...archives[label].nodes, ...nodes],
            pageInfo,
          },
        },
      };
    },

    setAbout(state: any, payload: any) {
      const { about } = payload;
      return {
        ...state,
        about,
      };
    },
  },
  effects: {
    async getPostsAsync(payload: { ctx?: next.NextPageContext }) {
      const { ctx } = payload;
      const posts: IGithubIssues = await Api.create(ctx).posts();
      return this.setPosts({ posts });
    },

    async loadMorePostsAsync(payload: { ctx?: next.NextPageContext; cursor?: string }) {
      const { ctx, cursor } = payload;
      const posts: IGithubIssues = await Api.create(ctx).posts(cursor);
      return this.addPosts({ posts });
    },

    async getRecommendAsync(payload: { ctx?: next.NextPageContext }) {
      const { ctx } = payload;
      const posts: IGithubIssues = await Api.create(ctx).recommend();
      return this.setRecommend({ posts });
    },

    async getLabelsAsync(payload: { ctx?: next.NextPageContext }) {
      const { ctx } = payload;
      const labels: IGithubLabels = await Api.create(ctx).labels();
      return this.setLabels({ labels });
    },

    async getArchivesAsync(payload: { ctx?: next.NextPageContext; label: string }) {
      const { ctx, label } = payload;
      const posts: IGithubIssues = await Api.create(ctx).archives({ label });
      return this.setArchives({ label, posts });
    },

    async loadMoreArchivesAsync(payload: {
      ctx?: next.NextPageContext;
      label: string;
      cursor?: string;
    }) {
      const { ctx, label, cursor } = payload;
      const posts: IGithubIssues = await Api.create(ctx).archives({ label, cursor });
      return this.addArchives({ label, posts });
    },

    async getAboutAsync(payload: { ctx?: next.NextPageContext }) {
      const { ctx } = payload;
      const about: IGithubIssue = await Api.create(ctx).about();
      return this.setAbout({ about });
    },
  },
};
