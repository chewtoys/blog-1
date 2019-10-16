import _ from 'lodash/fp';
import removeMarkdown from 'remove-markdown';

export const getConfig = () => JSON.parse(JSON.stringify(process.env.CONFIG));

export const truncateMarkdown = (markdown: string, length: number = 200) => {
  return _.compose(
    _.truncate({ length }),
    _.replace(/\n/g, ' '),
    removeMarkdown,
  )(markdown);
};

export const extractMarkdownImage = (markdown: string) => {
  const imageRe = /!\[.*?\]\((.+?)\)/g;
  const matchs = imageRe.exec(markdown);
  if (matchs) {
    return matchs[1];
  }
  return null;
};
