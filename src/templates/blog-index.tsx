import * as React from 'react';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import withStyles, { WithSheet } from 'react-jss';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';

import { getMarkdownRemarkEdgeNode } from '../utils/helpers';

const styles = (theme: any) => ({
  wrapper: {
    maxWidth: '650px',
  },
});

type IIndexPageProps = WithSheet<typeof styles> & {
  location: Location;
  data: {
    allMarkdownRemark: IMarkdownRemark;
  };
  pageContext: {
    page: number;
    total: number;
    limit: number;
  };
}

const IndexPageTemplate = (props: IIndexPageProps) => {
  const { location, data, pageContext, classes } = props;
  const posts = getMarkdownRemarkEdgeNode(data);
  const { page, total, limit } = pageContext;

  return (
    <Layout location={location}>
      <SEO />
      <Container>
        <Row>
          <Col lg={8}>
            <div className={classes.wrapper}>
              {posts.map((node: IMarkdownRemarkNode) => (
                <Post key={node.id} post={node} simple />
              ))}
            </div>
            <Pagination page={page} size={limit} total={total} />
          </Col>
          <Col lg={4}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query GetAllBlogPost($skip: Int, $limit: Int) {
    allMarkdownRemark(
      skip: $skip,
      limit: $limit,
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            tags
          }
          fields {
            slug
          }
          excerpt(truncate: true)
          timeToRead
        }
      }
    }
  }
`;

export default withStyles(styles)(IndexPageTemplate);
