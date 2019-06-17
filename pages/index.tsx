import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';

import Layout from '../components/Layout';
import Post from '../components/Post';
import PageContext from '../lib/context';
import service from '../lib/service';
import useWindowScroll from '../hooks/useWindowScroll';
import { perPage } from '../config.json';

interface IndexPageProps {
  posts: IBlogPost[];
  page: number;
}

const IndexPage: next.NextFunctionComponent<IndexPageProps> = (props) => {
  const [posts, setPosts] = React.useState(props.posts);
  const [page, setPage] = React.useState(props.page);

  useWindowScroll(_.debounce(300, async () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    const height = scrollHeight - scrollTop;

    if (height === clientHeight) {
      const nextPage = page + 1;
      const nextPosts = await service.getPostsByPage(page + 1);

      setPage(nextPage);
      setPosts([...posts, ...nextPosts]);
    }
  }));

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
  const posts = await service.getPostsByPage(page, perPage);
  const context = await service.getPageContext();

  return {
    ...context,
    page,
    posts,
  };
};

export default IndexPage;
