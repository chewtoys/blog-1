import { format } from 'date-fns';
import _ from 'lodash/fp';

interface OctokitIssue {
  number: number;
  title: string;
  labels: Array<{name: string}>;
  body: string;
  created_at: string;
  updated_at: string;
  comments: number;
}

export const convertIssueToPost = (issue: OctokitIssue) => {
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
