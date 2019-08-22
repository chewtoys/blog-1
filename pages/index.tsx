import * as React from 'react';
import * as next from 'next';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import LoadMore from '../components/LoadMore';
import useLoadMore from '../hooks/useLoadMore';
import Api from '../lib/api';

interface IIndexPageProps {
  posts: IGithubIssues;
  recommend: IGithubIssues;
  labels: IGithubLabels;
}

const ColWithMaxWidth = styled(Col)`
  max-width: 650px;
`;

const IndexPage: next.NextPage<IIndexPageProps> = (props) => {
  const { posts, recommend, labels } = props;

  const api: Api = Api.create();
  const loadCallback = ({ endCursor }: IGithubPageInfo) => api.posts(endCursor);
  const [{ nodes, pageInfo, loading }, loadHandler] = useLoadMore(posts, loadCallback);

  return (
    <Layout>
      <SEO />
      <Row>
        <ColWithMaxWidth lg={8}>
          {nodes.map((node: IGithubIssue) => (
            <Post key={node.id} data={node} excerpt />
          ))}
          <LoadMore loading={loading} visiable={pageInfo.hasNextPage} onClick={loadHandler} />
        </ColWithMaxWidth>
        <Col lg={4}>
          <Sidebar dataSource={{ recommend, labels }} />
        </Col>
      </Row>
    </Layout>
  );
};

IndexPage.getInitialProps = async (ctx: next.NextPageContext) => {
  const api = Api.create(ctx);

  const [posts, recommend, labels] = await Promise.all([
    api.posts(),
    api.recommend(),
    api.labels(),
  ]);

  if (typeof window === 'undefined') {
    // @ts-ignore
    await ctx.reduxStore.dispatch.posts.getPosts(ctx);
  }

  return {
    posts,
    recommend,
    labels,
  };
};

const mapStateToProps = (state: any) => ({
  nodes: state.posts.nodes,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPosts: (ctx: next.NextPageContext, cursor?: string) => dispatch.posts.getPosts(ctx, cursor),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexPage);
