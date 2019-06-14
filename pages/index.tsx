import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';

import Layout from '../components/Layout';
import Post from '../components/Post';
import octokit from '../lib/octokit';
import { convertIssueToPost } from '../lib/convert';
import config from '../config.json';

interface IndexPageProps {
  posts: BlogPost[];
  page: number;
}

const IndexPage: next.NextFunctionComponent<IndexPageProps> = (props) => {
  const { posts } = props;

  return (
    <Layout>
      {posts.map((post: BlogPost) => {
        return <Post key={post.slug} data={post} excerpt />;
      })}
    </Layout>
  );
};

IndexPage.getInitialProps = async (ctx: next.NextContext) => {
  const page: number = _.toNumber(ctx.query.page) || 1;
  const per_page: number = _.toNumber(ctx.query.per_page) || config.per_page;

  const res = await octokit.issues.listForRepo({
    owner: config.owner,
    repo: config.repo,
    creator: config.owner,
    page,
    per_page,
  });
  // TODO: error handle
  const posts = _.map(convertIssueToPost, res.data);

  return {
    posts,
    page,
  };
};

export default IndexPage;
