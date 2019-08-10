/// <reference types="../../next-env" />

import _ from 'lodash/fp';
import removeMarkdown from 'remove-markdown';

import db from '../../db.json';

export const truncate = _.compose(
  _.truncate({ length: 200 }),
  _.replace(/\n/g, ' '),
  removeMarkdown,
);

export const fixRealCreatedAt = (node: IGithubIssue) => {
  const { number: issueId, createdAt } = node;
  const realCreatedAt = _.get('date', _.find({ issueId }, db)) || createdAt;
  return {
    ...node,
    createdAt: realCreatedAt,
  };
};
