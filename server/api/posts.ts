import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { getConfig, generatePost } from '../common/utils';

const { owner, repo } = getConfig();

const query = `
query ($owner: String!, $repo: String!, $after: String) {
  repository(owner: $owner, name: $repo) {
    issues(
      orderBy: {field: CREATED_AT, direction: DESC},
      filterBy: { createdBy: $owner, states: OPEN },
      first: 10,
      after: $after
    ) {
      nodes {
        id
        number
        title
        body
        labels(first: 5) {
          nodes {
            name
          }
        }
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

  const data = await octokit(query, {
    owner,
    repo,
    after,
  });
  const { issues } = data.repository;
  issues.nodes = _.map(generatePost, issues.nodes);

  res.status(200).json(issues);
};
