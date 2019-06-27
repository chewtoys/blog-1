import _ from 'lodash/fp';
import db from '../../db.json';

export const fixRealCreatedAt = (node: IGithubIssue) => {
  const { number: issueId, createdAt } = node;
  const realCreatedAt = _.get('date', _.find({ issueId }, db)) || createdAt;
  return {
    ...node,
    createdAt: realCreatedAt,
  };
};
