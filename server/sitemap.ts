/// <reference types="../next-env" />

import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';
import sm, { EnumChangefreq } from 'sitemap';

import octokit from './common/octokit';
import { getConfig, generatePost } from './common/utils';

const { owner, repo, site } = getConfig();

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
        number
        title
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`;

// @ts-ignore
export default async (req: NowRequest, res: NowResponse) => {
  const data = await octokit(query, {
    owner,
    repo,
  });
  const issues: IGithubIssues = data.repository.issues;
  const posts = _.map(generatePost, issues.nodes);

  const sitemap = sm.createSitemap({
    hostname: site.url,
    cacheTime: 600000,
    urls: posts.map(({ id }: { id: string }) => ({
      url: `/p/${id}`,
      changefreq: EnumChangefreq.DAILY,
      priority: 0.8,
    })),
  });

  res.setHeader('Content-Type', 'application/xml');
  res.send(sitemap.toString());
};
