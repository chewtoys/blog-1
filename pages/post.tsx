import * as React from 'react';
import * as next from 'next';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import removeMarkdown from 'remove-markdown';
import _ from 'lodash/fp';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { siteUrl } from '../config.json';

interface IPostsPageProps {
  post: IGithubIssue;
}

const truncate = _.compose(
  _.truncate({ length: 200 }),
  _.replace(/\n/g, ' '),
  removeMarkdown,
);

const extractImage = (str: string) => {
  const imageRe = /!\[.*?\]\((.+?)\)/g;
  const matchs = imageRe.exec(str);
  if (matchs) {
    return matchs[1];
  }
  return null;
};

const PostsPage: next.NextPage = (props: IPostsPageProps) => {
  const { post } = props;
  const { number: id, title, body } = post;

  return (
    <Layout>
      <SEO
        subTitle={title}
        description={truncate(body)}
        canonical={`${siteUrl}/post/${id}`}
        image={extractImage(body)}
      />
      <Row className="justify-content-md-center">
        <Col lg={10}>
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
