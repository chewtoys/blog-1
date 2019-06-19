import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { convertIssueToPost } from '../common/convert';
import { owner, repo, perPage } from '../../config.json';

export default async (req: NowRequest, res: NowResponse) => {
  const page = _.toNumber(req.query.page) || 1;
  // tslint:disable-next-line
  const per_page = _.toNumber(req.query.per_page) || perPage;
  const tag = _.toString(req.query.tag) || '';

  const issueRes = await octokit.issues.listForRepo({
    owner,
    repo,
    page,
    per_page,
    creator: owner,
    labels: tag,
  });
  const issues = issueRes.data as IGithubIssue[];
  const posts = _.map(convertIssueToPost, issues);

  res.status(200).json(posts);
};
