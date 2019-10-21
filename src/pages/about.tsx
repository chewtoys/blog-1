import * as React from 'react';
import * as next from 'next';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash/fp';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import About from '../components/About';
import Sidebar from '../components/Sidebar';
import { getConfig, truncateMarkdown, extractMarkdownImage } from '../utils';

const { site } = getConfig();

interface IIndexPageProps {
  about: IGithubIssue;
}

const AboutPage: next.NextPage = (props: IIndexPageProps) => {
  const { about } = props;
  const { title, body } = about;

  return (
    <Layout>
      <SEO
        subTitle={title}
        description={truncateMarkdown(body)}
        canonical={`${site.url}/about`}
        image={extractMarkdownImage(body)}
      />
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <About data={about} />
        </Col>
      </Row>
    </Layout>
  );
};

AboutPage.getInitialProps = async (ctx: next.NextPageContext & { reduxStore: any }) => {
  const state = ctx.reduxStore.getState();
  const { about } = state.app;

  if (_.isEmpty(about)) {
    await ctx.reduxStore.dispatch.app.getAboutAsync({ ctx });
  }
  return {};
};

const mapStateToProps = (state: any) => {
  const { about } = state.app;
  return {
    about,
  };
};

export default connect(mapStateToProps)(AboutPage);
