import { format } from 'date-fns';
import _ from 'lodash/fp';

export const convertIssueToPost = (issue: IGithubIssue) => {
  const { number: num, title, labels, body, created_at, updated_at, comments } = issue;

  const slug = format(updated_at, 'YYYYMMDD') + num;
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
