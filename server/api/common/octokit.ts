import Octokit from '@octokit/rest';
import logger from 'console-log-level';

export default new Octokit({
  auth: process.env.TOKEN,
  log: logger({ level: 'info' }),
});
