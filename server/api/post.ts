import assert from 'assert';
import { NowRequest, NowResponse } from '@now/node';
import Hashids from 'hashids/cjs';
import _ from 'lodash/fp';

import octokit from '../common/octokit';
import { getConfig, generatePost } from '../common/utils';

const { owner, repo, site } = getConfig();
const hashids = new Hashids(owner, 8, '0123456789abcedf');

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
  const id = _.toString(req.query.id);
  assert(id, 'id is required');
  const issueNumber = _.toNumber(hashids.decodeHex(id));

  const data = await octokit(query, {
    owner,
    repo,
    number: issueNumber,
  });
  const { issue } = data.repository;

  res.status(200).json(generatePost(issue));
};
