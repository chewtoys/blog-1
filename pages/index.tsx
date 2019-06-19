import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Post from '../components/Post';
import LoadMore from '../components/LoadMore';
import Sidebar from '../components/Sidebar';
import PageContext from '../lib/context';
import Api from '../lib/api';
import { perPage } from '../config.json';

interface IIndexPageProps {
  posts: IBlogPost[];
  page: number;
  tag: string;
}

interface IIndexPageState {
  posts: IBlogPost[];
  page: number;
  loading: boolean;
}

const Content = styled.div`
  max-width: 650px;
`;

enum ActionType {
  LOADING,
  LOADED,
  RESET,
}

const init = ({ posts, page }: IIndexPageProps): IIndexPageState => ({
  posts,
  page,
  loading: false,
});

const reducer = (state: IIndexPageState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.LOADING:
      return { ...state, loading: true };
    case ActionType.LOADED:
      return {
        ...state,
        posts: payload.posts,
        page: payload.page,
        loading: false,
      };
    case ActionType.RESET:
      return init(payload);
    default:
      return state;
  }
};

const IndexPage: next.NextFunctionComponent<IIndexPageProps> = (props) => {
  const { tag } = props;
  const [state, dispatch] = React.useReducer(reducer, props, init);
  const { posts, page, loading } = state;

  const handleLoadMore = async () => {
    dispatch({ type: ActionType.LOADING });

    const newPage = page + 1;
    const newPosts = await Api.client().getPostsByPage(newPage, perPage, { tag });

    dispatch({
      type: ActionType.LOADED,
      payload: {
        posts: [...posts, ...newPosts],
        page: newPage,
      },
    });
  };

  React.useEffect(() => {
    dispatch({
      type: ActionType.RESET,
      payload: props,
    });
  }, [props]);

  return (
    <PageContext.Provider value={props}>
      <Layout>
        <Row>
          <Col lg={8}>
            <Content>
              {posts.map((post: IBlogPost) => {
                return <Post key={post.slug} data={post} excerpt />;
              })}
              <LoadMore
                visiable={posts.length % perPage === 0}
                loading={loading}
                onClick={handleLoadMore}
              />
            </Content>
          </Col>
          <Col lg={4}>
            <Sidebar />
          </Col>
        </Row>
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
