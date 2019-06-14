import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';

import Layout from '../components/Layout';
import Post from '../components/Post';
import octokit from '../lib/octokit';
import { convertIssueToPost } from '../lib/convert';
import config from '../config.json';

interface PostsPageProps {
  post: BlogPost;
}

// getIssueNumberBySlug : string -> number
const getIssueNumberBySlug = _.compose(
  _.toNumber,
  _.last,
  (slug) => slug.match(/^(\d{8})(\d+)/)
);

const PostsPage: next.NextFunctionComponent<PostsPageProps> = (props) => {
  const { post } = props;
  return (
    <Layout>
      <Post data={post} />
    </Layout>
  );
};

PostsPage.getInitialProps = async (ctx: next.NextContext) => {
  const slug = _.toString(ctx.query.slug);
  if (!slug) {
    throw new Error('slug is required!');
  }
  const issue_number = getIssueNumberBySlug(slug);
  const res = await octokit.issues.get({
    owner: config.owner,
    repo: config.repo,
    issue_number,
  });
  const post = convertIssueToPost(res.data);

  return { post };
}

export default PostsPage;
