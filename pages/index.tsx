import * as React from 'react';
import * as next from 'next';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import useLoadMore from '../hooks/useLoadMore';
import Api from '../lib/api';

interface IIndexPageProps {
  posts: IGithubIssues;
  recommend: IGithubIssues;
  labels: IGithubLabels;
}

const PostList = styled.div`
  max-width: 650px;
`;

const IndexPage: next.NextFunctionComponent<IIndexPageProps> = (props) => {
  const { posts, recommend, labels } = props;
  const { nodes, pageInfo } = useLoadMore(posts, ({ endCursor }) => {
    return Api.createWithContext().posts(endCursor);
  });

  return (
    <Layout>
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
