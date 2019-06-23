import { NowRequest, NowResponse } from '@now/node';
import octokit from '@octokit/graphql';
import _ from 'lodash/fp';

import { owner, repo, recommendCount } from '../../../config.json';

const graphql = octokit.defaults({
  headers: {
    authorization: `token ${process.env.TOKEN}`,
  },
});

const query = `
query ($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    issues(
      orderBy: {field: COMMENTS, direction: DESC},
      filterBy: { createdBy: $owner, states: OPEN },
      first: ${recommendCount},
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
  const data = await graphql(query, {
    owner,
    repo,
  });
  const { issues } = data.repository;

  res.status(200).json(issues);
};
