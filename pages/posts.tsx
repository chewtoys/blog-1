import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';
import { Row, Col } from 'react-bootstrap';

import Layout from '../components/Layout';
import Post from '../components/Post';
import PageContext from '../lib/context';
import Api from '../lib/api';

interface IPostsPageProps {
  post: IBlogPost;
}

// getIdBySlug : string -> number
const getIdBySlug = _.compose(
  _.toNumber,
  _.last,
  (slug) => slug.match(/^(\d{8})(\d+)/),
);

const PostsPage: next.NextFunctionComponent<IPostsPageProps> = (props) => {
  const { post } = props;
  return (
    <PageContext.Provider value={props}>
      <Layout>
        <Row className="justify-content-md-center">
          <Col lg={10}>
            <Post data={post} />
          </Col>
        </Row>
      </Layout>
    </PageContext.Provider>
  );
};

PostsPage.getInitialProps = async (ctx: next.NextContext) => {
  const slug = _.toString(ctx.query.slug);
  if (!slug) {
    throw new Error('slug is required!');
  }
  const api = ctx.req ? Api.server(ctx) : Api.client();

  const issueNumber = getIdBySlug(slug);
  const post = await api.getPostById(issueNumber);
  const context = await api.getPageContext();

  return {
    ...context,
    post,
  };
};

export default PostsPage;
