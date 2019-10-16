import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { getConfig, fixRealCreatedAt } from '../common/utils';

const { owner, repo } = getConfig();

const query = `
query ($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    issues(
      orderBy: {field: COMMENTS, direction: DESC},
      filterBy: { createdBy: $owner, states: OPEN },
      first: 5,
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
