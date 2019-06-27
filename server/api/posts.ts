import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { fixRealCreatedAt } from '../common/utils';
import { owner, repo, perPage } from '../../config.json';

const query = `
query ($owner: String!, $repo: String!, $after: String) {
  repository(owner: $owner, name: $repo) {
    issues(
      orderBy: {field: CREATED_AT, direction: DESC},
      filterBy: { createdBy: $owner, states: OPEN },
      first: ${perPage},
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
  issues.nodes = _.map(fixRealCreatedAt, issues.nodes);

  res.status(200).json(issues);
};
