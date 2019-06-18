import { NowRequest, NowResponse } from '@now/node';
import Octokit from '@octokit/rest';
import logger from 'console-log-level';
import _ from 'lodash/fp';

import { owner, repo } from '../../config.json';

const octokit = new Octokit({
  auth: process.env.TOKEN,
  log: logger({ level: 'info' }),
});

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
