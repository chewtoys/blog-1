import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';

import Layout from '../components/Layout';
import Post from '../components/Post';
import PageContext from '../lib/context';
import service from '../lib/service';
import config from '../config.json';

interface IndexPageProps {
  posts: IBlogPost[];
  page: number;
}

const IndexPage: next.NextFunctionComponent<IndexPageProps> = (props) => {
  const { posts } = props;

  return (
    <PageContext.Provider value={props}>
      <Layout>
        {posts.map((post: IBlogPost) => {
          return <Post key={post.slug} data={post} excerpt />;
        })}
      </Layout>
    </PageContext.Provider>
  );
};

IndexPage.getInitialProps = async (ctx: next.NextContext) => {
  const page: number = _.toNumber(ctx.query.page) || 1;
  // tslint:disable-next-line
  const per_page: number = _.toNumber(ctx.query.per_page) || config.perPage;

  const posts = await service.getPostsByPage(page, per_page);
  const context = await service.getPageContext();

  return {
    ...context,
    page,
    posts,
  };
};

export default IndexPage;
