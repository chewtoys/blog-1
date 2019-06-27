import * as React from 'react';
import * as next from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import useWindowScroll from 'react-use/lib/useWindowScroll';
import useDebounce from 'react-use/lib/useDebounce';

import Layout from '../components/Layout';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import Api from '../lib/api';

import { title } from '../config.json';

interface IIndexPageProps {
  posts: IGithubIssues;
  recommend: IGithubIssues;
  labels: IGithubLabels;
}

enum ActionTypes {
  LOADING,
  LOADED,
  RESET,
}

const reducer = (state: IGithubLabels, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOADED:
      return {
        nodes: [...state.nodes, ...payload.nodes],
        pageInfo: payload.pageInfo,
      };
    case ActionTypes.RESET:
      return { ...state };
    default:
      return state;
  }
};

const PostList = styled.div`
  max-width: 650px;
`;

const IndexPage: next.NextFunctionComponent<IIndexPageProps> = (props) => {
  const { posts, recommend, labels } = props;
  const [state, dispatch] = React.useReducer(reducer, posts);
  const { nodes, pageInfo } = state as IGithubIssues;

  const { y } = useWindowScroll();
  useDebounce(
    () => {
      const { scrollHeight, clientHeight } = window.document.documentElement;
      if (y === scrollHeight - clientHeight) {
        Api.createWithContext()
          .posts(pageInfo.endCursor)
          .then((nextPosts: IGithubIssues) => {
            dispatch({
              type: ActionTypes.LOADED,
              payload: nextPosts,
            });
          });
      }
    },
    500,
    [y],
  );

  React.useEffect(() => {
    dispatch({
      type: ActionTypes.RESET,
      payload: posts,
    });
  }, [posts]);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Row>
        <Col lg={8}>
          <PostList>
            {nodes.map((node: IGithubIssue) => (
              <Post key={node.id} data={node} excerpt />
            ))}
            <Loading visiable={pageInfo.hasNextPage} />
          </PostList>
        </Col>
        <Col lg={4}>
          <Sidebar dataSource={{ recommend, labels }} />
        </Col>
      </Row>
    </Layout>
  );
};

IndexPage.getInitialProps = async (ctx: next.NextContext) => {
  const api = Api.createWithContext(ctx);

  const [posts, recommend, labels] = await Promise.all([
    api.posts(),
    api.recommend(),
    api.labels(),
  ]);

  return {
    posts,
    recommend,
    labels,
  };
};

export default IndexPage;
