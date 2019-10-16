import octokit from '@octokit/graphql';

export default octokit.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});
