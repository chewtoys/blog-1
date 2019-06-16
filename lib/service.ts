import Octokit from '@octokit/rest';
import logger from 'console-log-level';
import _ from 'lodash/fp';

import { convertIssueToPost } from '../lib/convert';
import config from '../config.json';

const { owner, repo, recentCount } = config;

const octokit = new Octokit({
  auth: process.env.TOKEN,
  log: logger({ level: 'info' }),
});

const service = {
  // tslint:disable-next-line
  async getPostsByPage(page: number = 1, per_page: number = 15): Promise<IBlogPost[]> {
    const res = await octokit.issues.listForRepo({
      owner,
      repo,
      creator: owner,
      page,
      per_page,
    });
    const issues = res.data as IGithubIssue[];
    const posts = _.map(convertIssueToPost, issues);
    return posts;
  },

  async getRecentPosts(): Promise<IBlogPost[]> {
    const res = await octokit.issues.listForRepo({
      page: 1,
      owner,
      repo,
      creator: owner,
      per_page: recentCount,
    });
    const issues = res.data as IGithubIssue[];
    const posts = _.map(convertIssueToPost, issues);
    return posts;
  },

  // tslint:disable-next-line
  async getPostByIssueNumber(issue_number: number): Promise<IBlogPost> {
    const res = await octokit.issues.get({
      owner,
      repo,
      issue_number,
    });
    const post = convertIssueToPost(res.data as IGithubIssue);
    return post;
  },

  async getAllTags(): Promise<string[]> {
    const res = await octokit.issues.listLabelsForRepo({
      owner,
      repo,
    });
    const tags = _.map(_.get('name'), res.data as IGithubLabel[]);
    return tags;
  },

  async getPageContext(): Promise<IPageContextValue> {
    const [recent, tags] = await Promise.all([
      service.getRecentPosts(),
      service.getAllTags(),
    ]);

    return {
      recent,
      tags,
    };
  },
};

export default service;
