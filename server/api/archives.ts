import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { owner, repo } from '../../config.json';

const query = `
query ($owner: String!, $repo: String!, $after: String) {
  repository(owner: $owner, name: $repo) {
    issues(
      orderBy: {field: CREATED_AT, direction: DESC},
      filterBy: { createdBy: $owner, states: OPEN },
      first: 100,
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

  const data = await octokit(query, {
    owner,
    repo,
    after,
  });
  const { issues } = data.repository;

  res.status(200).json(issues);
};
