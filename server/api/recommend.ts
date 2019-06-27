import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { fixRealCreatedAt } from '../common/utils';
import { owner, repo, recommend } from '../../config.json';

const query = `
query ($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    issues(
      orderBy: {field: COMMENTS, direction: DESC},
      filterBy: { createdBy: $owner, states: OPEN },
      first: ${recommend},
    ) {
      nodes {
        number
        title
        createdAt
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
  const { issues } = data.repository;
  issues.nodes = _.map(fixRealCreatedAt, issues.nodes);

  res.status(200).json(issues);
};
