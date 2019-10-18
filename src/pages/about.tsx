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
  recommend: IGithubIssues;
  labels: IGithubLabels;
}

const ColWithMaxWidth = styled(Col)`
  max-width: 650px;
`;

const AboutPage: next.NextPage = (props: IIndexPageProps) => {
  const { about, recommend, labels } = props;
  const { title, body } = about;

  return (
    <Layout>
      <SEO
        subTitle={title}
        description={truncateMarkdown(body)}
        canonical={`${site.url}/about`}
        image={extractMarkdownImage(body)}
      />
      <Row>
        <ColWithMaxWidth lg={8}>
          <About data={about} />
        </ColWithMaxWidth>
        <Col lg={4}>
          <Sidebar dataSource={{ recommend, labels }} />
        </Col>
      </Row>
    </Layout>
  );
};

AboutPage.getInitialProps = async (ctx: next.NextPageContext & { reduxStore: any }) => {
  const state = ctx.reduxStore.getState();
  const { about, recommend, labels } = state.app;

  const dispatchs = [];
  if (_.isEmpty(about)) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getAboutAsync({ ctx }));
  }
  if (_.isEmpty(recommend)) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getRecommendAsync({ ctx }));
  }
  if (_.isEmpty(labels)) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getLabelsAsync({ ctx }));
  }
  await Promise.all(dispatchs);
  return {};
};

const mapStateToProps = (state: any) => ({
  ...state.app,
});

export default connect(mapStateToProps)(AboutPage);
