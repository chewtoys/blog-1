import * as React from 'react';
import * as next from 'next';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash/fp';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import LoadMore from '../components/LoadMore';

interface IIndexPageProps {
  posts: IGithubIssues;
  recommend: IGithubIssues;
  labels: IGithubLabels;
  loadMorePostsAsync: (cursor?: string) => Promise<void>;
}

const ColWithMaxWidth = styled(Col)`
  max-width: 650px;
`;

const IndexPage: next.NextPage = (props: IIndexPageProps) => {
  const { posts, recommend, labels } = props;
  const { pageInfo: { hasNextPage, endCursor } } = posts;

  const [loading, setLoading] = React.useState(false);
  const handleLoadMore = async () => {
    setLoading(true);
    await props.loadMorePostsAsync(endCursor);
    setLoading(false);
  };

  return (
    <Layout>
      <SEO />
      <Row>
        <ColWithMaxWidth lg={8}>
          {posts.nodes.map((node: IGithubIssue) => (
            <Post key={node.id} data={node} excerpt />
          ))}
          <LoadMore loading={loading} visiable={hasNextPage} onClick={handleLoadMore} />
        </ColWithMaxWidth>
        <Col lg={4}>
          <Sidebar dataSource={{ recommend, labels }} />
        </Col>
      </Row>
    </Layout>
  );
};

IndexPage.getInitialProps = async (ctx: next.NextPageContext & { reduxStore: any }) => {
  const state = ctx.reduxStore.getState();
  const { posts, recommend, labels } = state.app;

  const dispatchs = [];
  if (_.isEmpty(posts)) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getPostsAsync({ ctx }));
  }
  if (_.isEmpty(recommend)) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getRecommendAsync({ ctx }));
  }
  if (_.isEmpty(labels)) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getLabelsAsync({ ctx }));
  }
  await Promise.all(dispatchs);
  return {};
};

const mapStateToProps = (state: any) => ({
  ...state.app,
});

const mapDispatchToProps = (dispatch: any) => ({
  loadMorePostsAsync: (cursor?: string) => dispatch.app.loadMorePostsAsync({ cursor }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);
