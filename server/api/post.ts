import assert from 'assert';
import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { fixRealCreatedAt } from '../common/utils';
import { owner, repo } from '../../config.json';

const query = `
query ($owner: String!, $repo: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    issue(number: $number) {
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
      updatedAt
    }
  }
}
`;

export default async (req: NowRequest, res: NowResponse) => {
  const id = _.toNumber(req.query.id);
  assert(id, 'id must be a number');

  const data = await octokit(query, {
    owner,
    repo,
    number: id,
  });
  const { issue } = data.repository;

  res.status(200).json(fixRealCreatedAt(issue));
};
