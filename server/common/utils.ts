/// <reference types="../../next-env" />
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash/fp';
import removeMarkdown from 'remove-markdown';

import db from '../../db.json';

export const getConfig = () => {
  return yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../_config.yml'), 'utf8'));
};

export const truncateMarkdown = (markdown: string, length: number = 200) => {
  return _.compose(
    _.truncate({ length: 200 }),
    _.replace(/\n/g, ' '),
    removeMarkdown,
  )(markdown);
};

export const fixRealCreatedAt = (node: IGithubIssue) => {
  const { number: issueId, createdAt } = node;
  const realCreatedAt = _.get('date', _.find({ issueId }, db)) || createdAt;
  return {
    ...node,
    createdAt: realCreatedAt,
  };
};
