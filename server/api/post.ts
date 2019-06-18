import assert from 'assert';
import { NowRequest, NowResponse } from '@now/node';
import Octokit from '@octokit/rest';
import logger from 'console-log-level';
import _ from 'lodash/fp';

import { convertIssueToPost } from '../../lib/convert';
import { owner, repo } from '../../config.json';

const octokit = new Octokit({
  auth: process.env.TOKEN,
  log: logger({ level: 'info' }),
});

export default async (req: NowRequest, res: NowResponse) => {
  const id = _.toNumber(req.query.id);
  assert(id, 'id is required');

  const issueRes = await octokit.issues.get({
    owner,
    repo,
    issue_number: id,
  });
  const issue = issueRes.data as IGithubIssue;
  const post = convertIssueToPost(issue);
  res.status(200).json(post);
};
