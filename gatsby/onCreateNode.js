const nodejieba = require('nodejieba');
const format = require('date-fns/format');

module.exports = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const { frontmatter } = node;

    const date = format(frontmatter.date, 'YYYYMMDD');
    const slug = `/posts/${date}${frontmatter.issueId}`;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    let keywords = nodejieba.extract(frontmatter.title, 2).map(({ word }) => word.toLowerCase());
    keywords = frontmatter.tags.reduce((words, tag) => {
      const word = tag.toLowerCase();
      if (!words.includes(word)) {
        words.push(word);
      }
      return words;
    }, keywords);
    createNodeField({
      node,
      name: 'keywords',
      value: keywords,
    });
  }
};
