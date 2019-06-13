import { format } from 'date-fns';
import _ from 'lodash/fp';

export const convertIssueToPost = (issue: GithubIssue) => {
  const { number, title, labels, body, created_at, updated_at, comments } = issue;

  const slug = format(updated_at, 'YYYYMMDD') + number;
  const tags = _.map(_.get('name'), labels);

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
