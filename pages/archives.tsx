import * as React from 'react';
import * as next from 'next';
import Link from 'next/link';
import _ from 'lodash/fp';
import { format, getYear } from 'date-fns';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import LoadMore from '../components/LoadMore';
import Sidebar from '../components/Sidebar';

import { themeColor } from '../config.json';

interface IArchivesPageProps {
  posts: IGithubIssues;
  recommend: IGithubIssues;
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
  color: ${(props) => (props.active ? themeColor : 'inherit')};
  border: 1px solid ${(props) => (props.active ? themeColor : '#e9e9e9')};
  border-radius: 3px;

  &::before {
    content: '#';
  }

  &:hover {
    color: ${themeColor};
    border-color: ${themeColor};
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
  color: #7a7a7a;
  margin-right: 10px;

  @media (max-width: 576px) {
    margin-right: 0;
    font-size: 0.75rem;
  }
`;

const Title = styled.span`
  color: ${themeColor};

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
  const { posts, recommend, labels, label } = props;
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
      <Row>
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
                  prefetch: true,
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
        <Col lg={4}>
          <Sidebar dataSource={{ recommend }} />
        </Col>
      </Row>
    </Layout>
  );
};

ArchivesPage.getInitialProps = async (ctx: next.NextPageContext & { reduxStore: any }) => {
  const label = (ctx.query.label || '').toString();
  const state = ctx.reduxStore.getState();
  const { archives, recommend, labels } = state.app;

  const dispatchs = [];
  if (_.isEmpty(archives[label])) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getArchivesAsync({ ctx, label }));
  }
  if (_.isEmpty(recommend)) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getRecommendAsync({ ctx }));
  }
  if (_.isEmpty(labels)) {
    dispatchs.push(ctx.reduxStore.dispatch.app.getLabelsAsync({ ctx }));
  }
  await Promise.all(dispatchs);
  return { label };
};

const mapStateToProps = (state: any, props: any) => {
  const { label } = props;
  const { archives, recommend, labels } = state.app;
  return {
    posts: archives[label],
    recommend,
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
