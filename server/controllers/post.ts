import * as Koa from 'Koa';
import * as _ from 'lodash/fp';

import { OWNER } from '../../config';
import GithubService, { IGithubIssue } from '../services/github';

interface IPost {
  number: number;
  title: string;
  tags: string[];
  body: string;
  created_at: string;
  updated_at: string;
};

const mapIssueToPost: (issues: IGithubIssue[]) => IPost[] = _.compose(
  _.map((issue: IGithubIssue) => {
    const { number, title, labels, body, created_at, updated_at } = issue;
    const tags = _.map(_.get('name'), labels);
    return {
      number,
      title,
      tags,
      body,
      created_at,
      updated_at,
    };
  }),
  _.filter(_.propEq('user.login', OWNER)),
);

export default {
  getPosts: async (ctx: Koa.ParameterizedContext) => {
    try {
      const { page = 1, size = 15 } = ctx.request.query;
      const issues = await GithubService.getIssues(page, size);
      const posts = mapIssueToPost(issues);
      ctx.body = posts;
    } catch (err) {
      ctx.throw(err);
    }
  },
};
