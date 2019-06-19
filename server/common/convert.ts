import { format } from 'date-fns';
import _ from 'lodash/fp';

import posts from '../posts.json';

const getRealCreatedAt = (issue: IGithubIssue) => {
  return _.compose(
    _.get('created_at'),
    _.find({ issueId: issue.number }),
    _.map(_.get('data')),
  )(posts);
};

export const convertIssueToPost = (issue: IGithubIssue) => {
  const { number: id, title, body, labels, created_at } = issue;

  const tags = _.map(_.get('name'), labels);
  const createdAt = getRealCreatedAt(issue) || created_at;
  const slug = format(createdAt, 'YYYYMMDD') + id;

  return {
    slug,
    title,
    body,
    tags,
    createdAt,
  };
};
