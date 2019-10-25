import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { getConfig, generatePost } from '../common/utils';

const { owner, repo } = getConfig();

const query = `
query ($owner: String!, $repo: String!, $after: String, $labels: [String!], $size: Int) {
  repository(owner: $owner, name: $repo) {
    issues(
      orderBy: {field: CREATED_AT, direction: DESC},
      filterBy: { createdBy: $owner, states: OPEN },
      labels: $labels,
      first: $size,
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
  const label = _.toString(req.query.label) || null;
  const size = _.toNumber(req.query.size) || 100;

  const data = await octokit(query, {
    owner,
    repo,
    after,
    labels: label ? [label] : null,
    size,
  });
  const { issues } = data.repository;
  issues.nodes = _.map(generatePost, issues.nodes);

  res.status(200).json(issues);
};
