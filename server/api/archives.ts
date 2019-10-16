import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { getConfig, fixRealCreatedAt } from '../common/utils';

const { owner, repo } = getConfig();

const query = `
query ($owner: String!, $repo: String!, $after: String, $labels: [String!]) {
  repository(owner: $owner, name: $repo) {
    issues(
      orderBy: {field: CREATED_AT, direction: DESC},
      filterBy: { createdBy: $owner, states: OPEN },
      labels: $labels,
      first: 30,
      after: $after
    ) {
      nodes {
        id
        number
        title
        createdAt
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
`;

export default async (req: NowRequest, res: NowResponse) => {
  const after = _.toString(req.query.cursor) || null;
  const label = _.toString(req.query.label) || '';

  const data = await octokit(query, {
    owner,
    repo,
    after,
    labels: label ? [label] : null,
  });
  const { issues } = data.repository;
  issues.nodes = _.map(fixRealCreatedAt, issues.nodes);

  res.status(200).json(issues);
};
