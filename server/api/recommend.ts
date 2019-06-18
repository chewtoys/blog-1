import { NowRequest, NowResponse } from '@now/node';
import Octokit from '@octokit/rest';
import logger from 'console-log-level';
import _ from 'lodash/fp';

import { convertIssueToPost } from '../../lib/convert';
import { owner, repo, recommendCount } from '../../config.json';

const octokit = new Octokit({
  auth: process.env.TOKEN,
  log: logger({ level: 'info' }),
});

// @ts-ignore
export default async (req: NowRequest, res: NowResponse) => {
  const issueRes = await octokit.issues.listForRepo({
    owner,
    repo,
    creator: owner,
    page: 1,
    per_page: recommendCount,
    sort: 'comments',
  });
  const issues = issueRes.data as IGithubIssue[];
  const posts = _.map(convertIssueToPost, issues);

  res.status(200).json(posts);
};
