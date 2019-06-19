import { format } from 'date-fns';
import _ from 'lodash/fp';

import posts from '../posts.json';

export const convertIssueToPost = (issue: IGithubIssue) => {
  const { number: issueId, title, labels, body, updated_at, comments } = issue;
  const post = _.find({ issueId }, posts);

  const slug = format(updated_at, 'YYYYMMDD') + issueId;
  const tags = _.map(_.get('name'), labels);
  // @ts-ignore
  const created_at = post ? posts.date : issue.created_at;

  return {
    slug,
    title,
    body,
    tags,
    created_at,
    updated_at,
    comments,
  };
};
