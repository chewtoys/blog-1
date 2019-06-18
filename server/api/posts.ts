import { NowRequest, NowResponse } from '@now/node';
import Octokit from '@octokit/rest';
import logger from 'console-log-level';
import _ from 'lodash/fp';

import { convertIssueToPost } from '../../lib/convert';
import { owner, repo, perPage } from '../../config.json';

const octokit = new Octokit({
  auth: process.env.TOKEN,
  log: logger({ level: 'info' }),
});

export default async (req: NowRequest, res: NowResponse) => {
  const page = _.toNumber(req.query.page) || 1;
  const per_page = _.toNumber(req.query.per_page) || perPage;

  const issueRes = await octokit.issues.listForRepo({
    owner,
    repo,
    creator: owner,
    page,
    per_page,
  });
  const issues = issueRes.data as IGithubIssue[];
  const posts = _.map(convertIssueToPost, issues);

  res.status(200).json(posts);
};
