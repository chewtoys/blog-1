import * as React from 'react';
import * as next from 'next';
import Link from 'next/link';
import _ from 'lodash/fp';
import { format, getYear } from 'date-fns';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import LoadMore from '../components/LoadMore';
import Sidebar from '../components/Sidebar';
import { getConfig } from '../utils';

const { theme, site } = getConfig();

interface IArchivesPageProps {
  posts: IGithubIssues;
  labels: IGithubLabels;
  label: string;
  loadMoreArchivesAsync: (label: string, endCursor?: string) => Promise<void>;
}

interface ILabelProps {
  active?: boolean;
}

const Block = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Labels = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Label = styled.span<ILabelProps>`
  display: inline-block;
  font-size: 0.85rem;
  margin-right: 10px;
  margin-top: 10px;
  padding: 7px;
  cursor: pointer;
  color: ${(props) => (props.active ? theme.color : 'inherit')};
  border: 1px solid ${(props) => (props.active ? theme.color : '#e9e9e9')};
  border-radius: 3px;

  &::before {
    content: '#';
  }

  &:hover {
    color: ${theme.color};
    border-color: ${theme.color};
  }
`;

const Year = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const Item = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
`;

const DateTime = styled.time`
  color: #757575;
  margin-right: 10px;

  @media (max-width: 576px) {
    margin-right: 0;
    font-size: 0.75rem;
  }
`;

const Title = styled.span`
  color: ${theme.color};

  @media (max-width: 576px) {
    display: block;
  }
`;

const groupByCreatedYear = _.groupBy(
  _.compose(
    getYear,
    _.get('createdAt'),
  ),
);

const ArchivesPage: next.NextPage = (props: IArchivesPageProps) => {
  const { posts, labels, label } = props;
  const {
    nodes,
    pageInfo: { hasNextPage, endCursor },
  } = posts;

  const [loading, setLoading] = React.useState(false);
  const handleLoadMore = React.useCallback(async () => {
    setLoading(true);
    await props.loadMoreArchivesAsync(label, endCursor);
    setLoading(false);
  }, [endCursor]);

  const groups = groupByCreatedYear(nodes);
  const years = _.keys(groups).sort((a, b) => +b - +a);

  return (
    <Layout>
      <SEO
        subTitle="归档"
        canonical={`${site.url}/archives`}
      />
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <Labels>
            {labels.nodes.map((node) => {
              const { name } = node;
              const active = label === name;
              const href = active ? '/archives' : `/archives?label=${name}`;
              return (
                <Link key={name} href={href}>
                  <Label active={active}>{name}</Label>
                </Link>
              );
            })}
          </Labels>
          {label && <h3>标签: {label}</h3>}
          {years.map((year: string) => (
            <Block key={year}>
              <Year>{year}</Year>
              {groups[year].map((node: IGithubIssue) => {
                const { number: id, title, createdAt } = node;

                const linkProps = {
                  href: `/post?id=${id}`,
                  as: `/post/${id}`,
                };
                return (
                  <Link key={id} {...linkProps}>
                    <Item>
                      <DateTime>{format(createdAt, 'YYYY年MM月DD日')}</DateTime>
                      <Title>{title}</Title>
                    </Item>
                  </Link>
                );
              })}
            </Block>
          ))}
          <LoadMore loading={loading} visiable={hasNextPage} onClick={handleLoadMore} />
        </Col>
      </Row>
    </Layout>
  );
};

ArchivesPage.getInitialProps = async (ctx: next.NextPageContext & { reduxStore: any }) => {
  const label = (ctx.query.label || '').toString();
  const state = ctx.reduxStore.getState();
  const { archives, labels } = state.app;

  const dispatchs = [];
  if (_.isEmpty(archives[label])) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getArchivesAsync({ ctx, label }));
  }
  if (_.isEmpty(labels)) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getLabelsAsync({ ctx }));
  }
  await Promise.all(dispatchs);
  return { label };
};

const mapStateToProps = (state: any, props: any) => {
  const { label } = props;
  const { archives, labels } = state.app;
  return {
    posts: archives[label],
    labels,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  loadMoreArchivesAsync: (label: string, cursor?: string) => dispatch.app.loadMoreArchivesAsync({ label, cursor }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArchivesPage);
