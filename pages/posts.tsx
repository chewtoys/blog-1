import * as React from 'react';
import * as next from 'next';
import _ from 'lodash/fp';
import { Row, Col } from 'react-bootstrap';

import Layout from '../components/Layout';
import Post from '../components/Post';
import Github from '../lib/github';

interface IPostsPageProps {
  issue: IGithubIssue;
}

const PostsPage: next.NextFunctionComponent<IPostsPageProps> = (props) => {
  const { issue } = props;

  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col lg={10}>
          <Post data={issue} />
        </Col>
      </Row>
    </Layout>
  );
};

PostsPage.getInitialProps = async (ctx: next.NextContext) => {
  const id = _.toNumber(ctx.query.id);
  const github = Github.createWithContext(ctx);
  const issue = await github.issue(id);

  return {
    issue,
  };
};

export default PostsPage;
