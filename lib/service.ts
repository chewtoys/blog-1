import Octokit from '@octokit/rest';
import logger from 'console-log-level';
import _ from 'lodash/fp';

import { convertIssueToPost } from '../lib/convert';
import config from '../config.json';

const octokit = new Octokit({
  auth: process.env.TOKEN,
  log: logger({ level: 'info' }),
});

const service = {
  async getBlogInfo(): Promise<IBlogInfo> {
    const res = await octokit.repos.get({
      owner: config.owner,
      repo: config.repo,
    });
    const repo = res.data as IGithubRepo;
    const { owner } = repo;
    const info = {
      user: {
        name: owner.login,
        avatar: owner.avatar_url,
        url: owner.html_url,
      },
      description: repo.description,
      posts_count: repo.open_issues_count,
    };
    return info;
  },

  // tslint:disable-next-line
  async getPostsByPage(page: number = 1, per_page: number = 15): Promise<IBlogPost[]> {
    const res = await octokit.issues.listForRepo({
      owner: config.owner,
      repo: config.repo,
      creator: config.owner,
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
      per_page: config.recentCount,
      owner: config.owner,
      repo: config.repo,
      creator: config.owner,
    });
    const issues = res.data as IGithubIssue[];
    const posts = _.map(convertIssueToPost, issues);
    return posts;
  },

  // tslint:disable-next-line
  async getPostByIssueNumber(issue_number: number): Promise<IBlogPost> {
    const res = await octokit.issues.get({
      owner: config.owner,
      repo: config.repo,
      issue_number,
    });
    const post = convertIssueToPost(res.data as IGithubIssue);
    return post;
  },

  async getAllTags(): Promise<string[]> {
    const res = await octokit.issues.listLabelsForRepo({
      owner: config.owner,
      repo: config.repo,
    });
    const tags = _.map(_.get('name'), res.data as IGithubLabel[]);
    return tags;
  },

  async getPageContext(): Promise<IPageContextValue> {
    const [info, recent, tags] = await Promise.all([
      service.getBlogInfo(),
      service.getRecentPosts(),
      service.getAllTags(),
    ]);

    info.tags_count = tags.length;

    return {
      info,
      recent,
      tags,
    };
  },
};

export default service;
