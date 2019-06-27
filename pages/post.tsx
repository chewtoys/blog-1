import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';
import { Row, Col } from 'react-bootstrap';

import Layout from '../components/Layout';
import Post from '../components/Post';
import Api from '../lib/api';

interface IPostsPageProps {
  post: IGithubIssue;
}

const PostsPage: next.NextFunctionComponent<IPostsPageProps> = (props) => {
  const { post } = props;

  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col lg={10}>
          <Post data={post} />
        </Col>
      </Row>
    </Layout>
  );
};

PostsPage.getInitialProps = async (ctx: next.NextContext) => {
  const id = _.toNumber(ctx.query.id);
  const post = await Api.createWithContext(ctx).post(id);

  return {
    post,
  };
};

export default PostsPage;
