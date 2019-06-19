// import { NowRequest, NowResponse } from '@now/node';
import octokit from '@octokit/graphql';
import _ from 'lodash/fp';

import { owner, repo } from '../../config.json';

const graphql = octokit({
  headers: {
    authorization: `token ${process.env.TOKEN}`,
  },
});

const query = `
  query issues($owner: String!, $repo: String!) {
    repository(owner:$owner, name:$repo) {
      issues() {
        edges {
          node {
            title
          }
        }
      }
    }
  }
`;

export default async () => {
  // const page = _.toNumber(req.query.page) || 1;

  const { issues } = await graphql(query, {
    owner,
    repo,
  });

  console.log(issues);
};
