import { NowRequest, NowResponse } from '@now/node';
import octokit from '@octokit/graphql';
import _ from 'lodash/fp';

import { owner, repo } from '../../../config.json';

const graphql = octokit.defaults({
  headers: {
    authorization: `token ${process.env.TOKEN}`,
  },
});

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
  const data = await graphql(query, {
    owner,
    repo,
  });
  const { labels } = data.repository;

  res.status(200).json(labels);
};
