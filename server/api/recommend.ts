import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from './common/octokit';
import { convertIssueToPost } from './common/convert';
import { owner, repo, recommendCount } from '../../config.json';

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
