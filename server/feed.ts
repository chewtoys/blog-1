/// <reference types="../next-env" />

import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';
import { Feed } from 'feed';

import octokit from './common/octokit';
import { truncate, fixRealCreatedAt } from './common/utils';
import config, { owner, repo } from '../config.json';

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
        body
        bodyHTML
        createdAt
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

  const feed = new Feed({
    id: config.siteUrl,
    title: config.title,
    description: config.description,
    link: config.siteUrl,
    language: 'zh-cn',
    favicon: config.siteUrl + config.icon,
    image: config.siteUrl + config.icon,
    copyright: `All rights reserved ${config.since}, ${config.author}`,
  });

  issues.nodes.forEach((issue: IGithubIssue) => {
    const { number: id, title, body, bodyHTML, createdAt } = fixRealCreatedAt(issue);
    const link = `${config.siteUrl}/post/${id}`;

    feed.addItem({
      title,
      link,
      description: truncate(body),
      content: bodyHTML,
      date: new Date(createdAt),
    });
  });

  res.setHeader('Content-Type', 'application/xml');
  res.send(feed.atom1());
};
