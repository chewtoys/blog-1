import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { owner, repo } from '../../config.json';

// @ts-ignore
export default async (req: NowRequest, res: NowResponse) => {
  const issueRes = await octokit.issues.listLabelsForRepo({
    owner,
    repo,
  });
  const labels = issueRes.data as IGithubLabel[];
  const tags = _.map(_.get('name'), labels);

  res.status(200).json(tags);
};
