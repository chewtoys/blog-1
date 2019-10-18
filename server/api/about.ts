import { NowRequest, NowResponse } from '@now/node';

import octokit from '../common/octokit';
import { getConfig } from '../common/utils';

const { owner, repo, site } = getConfig();

const query = `
query ($owner: String!, $repo: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    issue(number: $number) {
      id
      number
      title
      body
      createdAt
      updatedAt
    }
  }
}
`;

export default async (req: NowRequest, res: NowResponse) => {
  const data = await octokit(query, {
    owner,
    repo,
    number: site.about,
  });
  const { issue } = data.repository;

  res.status(200).json(issue);
};
