import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';

import Layout from '../components/Layout';
import Post from '../components/Post';
import PageContext from '../lib/context';
import service from '../lib/service';

interface IPostsPageProps {
  post: BlogPost;
}

// getIssueNumberBySlug : string -> number
const getIssueNumberBySlug = _.compose(
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
  const issueNumber = getIssueNumberBySlug(slug);
  const post = await service.getPostByIssueNumber(issueNumber);
  const context = await service.getPageContext();

  return {
    ...context,
    post,
  };
};

export default PostsPage;
