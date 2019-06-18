import assert from 'assert';

import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import { convertIssueToPost } from './common/convert';
import octokit from './common/octokit';
import { owner, repo } from '../../config.json';

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
