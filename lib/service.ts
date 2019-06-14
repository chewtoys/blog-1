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
  async getOwnerInfo(): Promise<BlogOwner> {
    const res = await octokit.users.getByUsername({
      username: owner,
    });
    return res.data as BlogOwner;
  },

  async getPostsByPage(page: number = 1, per_page: number = 15): Promise<BlogPost[]> {
    const res = await octokit.issues.listForRepo({
      owner,
      repo,
      page,
      per_page,
      creator: owner,
    });
    const issues = res.data as GithubIssue[];
    const posts = _.map(convertIssueToPost, issues);
    return posts;
  },

  async getRecentPosts(): Promise<BlogPost[]> {
    const res = await octokit.issues.listForRepo({
      owner,
      repo,
      page: 1,
      per_page: recentCount,
      creator: owner,
    });
    const issues = res.data as GithubIssue[];
    const posts = _.map(convertIssueToPost, issues);
    return posts;
  },

  async getPostByIssueNumber(issue_number: number): Promise<BlogPost> {
    const res = await octokit.issues.get({
      owner,
      repo,
      issue_number,
    });
    const post = convertIssueToPost(res.data as GithubIssue);
    return post;
  },

  async getAllTags(): Promise<string[]> {
    const res = await octokit.issues.listLabelsForRepo({
      owner,
      repo,
    });
    const tags = _.map(_.get('name'), res.data as GithubLabel[]);
    return tags;
  },

  async getPageContext(): Promise<PageContextValue> {
    const [user, recent, tags] = await Promise.all([
      service.getOwnerInfo(),
      service.getRecentPosts(),
      service.getAllTags(),
    ]);

    return {
      user,
      recent,
      tags,
    };
  }
};

export default service;
