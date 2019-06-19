import { NowRequest, NowResponse } from '@now/node';
import octokit from '@octokit/graphql';
import _ from 'lodash/fp';

import { owner, repo } from '../../config.json';

const graphql = octokit.defaults({
  headers: {
    authorization: `token ${process.env.TOKEN}`,
  },
});

const query = `
query ($owner: String!, $repo: String!, $after: String) {
  repository(owner: $owner, name: $repo) {
    issues(
      orderBy: {field: CREATED_AT, direction: DESC},
      first: 15,
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
      totalCount
    }
  }
}
`;

export default async (req: NowRequest, res: NowResponse) => {
  const after = req.query.after || null;

  const data = await graphql(query, {
    owner,
    repo,
    after,
  });

  res.status(200).json(data);
};
