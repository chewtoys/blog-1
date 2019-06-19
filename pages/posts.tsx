import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';

import Layout from '../components/Layout';
import Post from '../components/Post';
import PageContext from '../lib/context';
import api from '../lib/api';

interface IPostsPageProps {
  post: IBlogPost;
}

// getIdBySlug : string -> number
const getIdBySlug = _.compose(
  _.toNumber,
  _.last,
  (slug) => slug.match(/^(\d{8})(\d+)/),
);

const PostsPage: next.NextFunctionComponent<IPostsPageProps> = (props) => {
  const { post } = props;
  return (
    <PageContext.Provider value={props}>
      <Layout>
        <Post data={post} />
      </Layout>
    </PageContext.Provider>
  );
};

PostsPage.getInitialProps = async (ctx: next.NextContext) => {
  const slug = _.toString(ctx.query.slug);
  if (!slug) {
    throw new Error('slug is required!');
  }
  const issueNumber = getIdBySlug(slug);
  const post = await api.server(ctx).getPostById(issueNumber);
  const context = await api.server(ctx).getPageContext();

  return {
    ...context,
    post,
  };
};

export default PostsPage;
