/// <reference types="../next-env" />

import { NowRequest, NowResponse } from '@now/node';
import _ from 'lodash/fp';
import { Feed } from 'feed';

import octokit from './common/octokit';
import { getConfig, truncateMarkdown, generatePost } from './common/utils';

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
    id: site.url,
    title: site.title,
    description: site.description,
    link: site.url,
    language: 'zh-cn',
    favicon: site.url + site.icon,
    image: site.url + site.icon,
    copyright: `All rights reserved ${site.since}, ${site.author}`,
  });

  issues.nodes.forEach((issue: IGithubIssue) => {
    const { id, title, body, bodyHTML, createdAt } = generatePost(issue);
    const link = `${site.url}/p/${id}`;

    feed.addItem({
      title,
      link,
      description: truncateMarkdown(body),
      content: bodyHTML,
      date: new Date(createdAt),
    });
  });

  res.setHeader('Content-Type', 'application/xml');
  res.send(feed.atom1());
};
