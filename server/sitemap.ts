/// <reference types="../next-env" />

import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';
import sm, { EnumChangefreq } from 'sitemap';

import octokit from './common/octokit';
import { owner, repo, siteUrl } from '../config.json';

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
  const { issues } = data.repository;

  const postUrls = issues.nodes.map((issue: IGithubIssue) => ({
    url: `/post/${issue.number}`,
    changefreq: EnumChangefreq.WEEKLY,
    priority: 0.8,
  }));
  const sitemap = sm.createSitemap({
    hostname: siteUrl,
    cacheTime: 600000,
    urls: [
      {
        url: '/',
        changefreq: EnumChangefreq.DAILY,
        priority: 1,
      },
      ...postUrls,
    ],
  });

  res.setHeader('Content-Type', 'application/xml');
  res.send(sitemap.toString());
};
