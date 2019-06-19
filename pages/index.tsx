import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Post from '../components/Post';
import LoadMore from '../components/LoadMore';
import Card from '../components/Card';
import PageContext from '../lib/context';
import Api from '../lib/api';
import { perPage } from '../config.json';

interface IndexPageProps {
  posts: IBlogPost[];
  page: number;
  tag: string;
}

const Query = styled.span`
  font-family: Georgia, serif;
  font-weight: 400;
  font-size: 1.25rem;
`;

const IndexPage: next.NextFunctionComponent<IndexPageProps> = (props) => {
  const { tag } = props;
  const [posts, setPosts] = React.useState(props.posts);
  const [page, setPage] = React.useState(props.page);

  const [loading, setLoading] = React.useState(false);

  const handleLoadMore = async () => {
    setLoading(true);
    const newPage = page + 1;
    const newPosts = await Api.client().getPostsByPage(newPage, perPage, { tag });

    setPage(newPage);
    setPosts([...posts, ...newPosts]);
    setLoading(false);
  };

  React.useEffect(() => {
    setPosts(props.posts);
  }, [props]);

  return (
    <PageContext.Provider value={props}>
      <Layout>
        {tag && (
          <Card padding="1rem 1.5rem">
            <Query>标签: {tag}</Query>
          </Card>
        )}
        {posts.map((post: IBlogPost) => {
          return <Post key={post.slug} data={post} excerpt />;
        })}
        {(posts.length % perPage === 0) && (
          <LoadMore loading={loading} onClick={handleLoadMore} />
        )}
      </Layout>
    </PageContext.Provider>
  );
};

IndexPage.getInitialProps = async (ctx: next.NextContext) => {
  const page: number = _.toNumber(ctx.query.page) || 1;
  const tag: string = _.toString(ctx.query.tag) || '';

  const api = ctx.req ? Api.server(ctx) : Api.client();
  const posts = await api.getPostsByPage(page, perPage, { tag });
  const context = await api.getPageContext();

  return {
    ...context,
    posts,
    page,
    tag,
  };
};

export default IndexPage;
