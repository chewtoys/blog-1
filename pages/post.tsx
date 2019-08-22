import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';
import { Row, Col } from 'react-bootstrap';
import removeMarkdown from 'remove-markdown';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Api from '../lib/api';
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

const PostsPage: next.NextPage<IPostsPageProps> = (props) => {
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

PostsPage.getInitialProps = async (ctx: next.NextPageContext) => {
  const id = _.toNumber(ctx.query.id);
  const post = await Api.create(ctx).post(id);

  return {
    post,
  };
};

export default PostsPage;
