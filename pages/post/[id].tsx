import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';
import { Row, Col } from 'react-bootstrap';
import removeMarkdown from 'remove-markdown';

import SEO from '../../components/SEO';
import Layout from '../../components/Layout';
import Post from '../../components/Post';
import Api from '../../lib/api';

interface IPostsPageProps {
  post: IGithubIssue;
}

const truncate = _.compose(
  _.truncate({ length: 200 }),
  _.replace(/\n/g, ' '),
  removeMarkdown,
);

const PostsPage: next.NextPage<IPostsPageProps> = (props) => {
  const { post } = props;
  const { title, body } = post;

  return (
    <Layout>
      <SEO subTitle={title} excerpt={truncate(body)} />
      <Row className="justify-content-md-center">
        <Col lg={10}>
          <Post data={post} />
        </Col>
      </Row>
    </Layout>
  );
};

PostsPage.getInitialProps = async (ctx: next.NextPageContext) => {
  const id = _.toNumber(ctx.query.id);
  const post = await Api.createWithContext(ctx).post(id);

  return {
    post,
  };
};

export default PostsPage;