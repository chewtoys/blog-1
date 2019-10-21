import * as React from 'react';
import * as next from 'next';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash/fp';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { getConfig, truncateMarkdown, extractMarkdownImage } from '../utils';

interface IPostsPageProps {
  post: IGithubIssue;
}

const { site } = getConfig();

const PostsPage: next.NextPage = (props: IPostsPageProps) => {
  const { post } = props;
  const { number: id, title, body } = post;

  return (
    <Layout>
      <SEO
        subTitle={title}
        description={truncateMarkdown(body)}
        canonical={`${site.url}/post/${id}`}
        image={extractMarkdownImage(body)}
      />
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <Post data={post} />
        </Col>
      </Row>
    </Layout>
  );
};

PostsPage.getInitialProps = async (ctx: next.NextPageContext & { reduxStore: any }) => {
  const id = _.toNumber(ctx.query.id);
  const state = ctx.reduxStore.getState();
  const { posts } = state.post;

  if (_.isEmpty(posts[id])) {
    await ctx.reduxStore.dispatch.post.getAsync({ ctx, id });
  }
  return { id };
};

const mapStateToProps = (state: any, props: any) => {
  const { id } = props;
  const { posts } = state.post;
  return {
    post: posts[id],
  };
};

export default connect(mapStateToProps)(PostsPage);
