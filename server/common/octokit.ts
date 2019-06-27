import octokit from '@octokit/graphql';

export default octokit.defaults({
  headers: {
    authorization: `token ${process.env.TOKEN}`,
  },
});
