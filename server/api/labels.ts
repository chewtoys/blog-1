import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { owner, repo } from '../../config.json';

const query = `
query ($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    labels(first: 100) {
      nodes {
        name
        issues {
          totalCount
        }
      }
    }
  }
}
`;

// @ts-ignore
export default async (req: NowRequest, res: NowResponse) => {
  const data = await octokit(query, {
    owner,
    repo,
  });
  const { labels } = data.repository;

  res.status(200).json(labels);
};
