import * as React from 'react';
import * as next from 'next';
import Link from 'next/link';
import _ from 'lodash/fp';
import { format, getYear } from 'date-fns';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';
import useLoadMore from '../hooks/useLoadMore';
import Api from '../lib/api';

import { themeColor } from '../config.json';

interface IArchivesPageProps {
  archives: IGithubIssues;
  recommend: IGithubIssues;
  labels: IGithubLabels;
  label: string;
}

interface ILabelProps {
  highlight?: boolean;
}

const Block = styled.div`
  margin-top: 1.5rem;
`;

const Label = styled.span<ILabelProps>`
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
  color: ${(props) => props.highlight ? themeColor : 'inherit'};

  &::before {
    content: '#';
  }

  &:hover {
    color: ${themeColor};
    border-color: ${themeColor};
  }
`;

const Year = styled.h2`
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
`;

const Title = styled.span`
  font-size: 1rem;
  color: ${themeColor};
`;

const groupByCreatedYear = _.groupBy(
  _.compose(
    getYear,
    _.get('createdAt'),
  ),
);

const ArchivesPage: next.NextFunctionComponent<IArchivesPageProps> = (props) => {
  const { archives, recommend, labels, label } = props;
  const { nodes, pageInfo } = useLoadMore(archives, ({ endCursor }) => {
    return Api.createWithContext().archives({
      cursor: endCursor,
      label,
    });
  });

  const archiveGroups = groupByCreatedYear(nodes);
  const years = _.keys(archiveGroups).sort((a, b) => +b - +a);

  return (
    <Layout>
      <Row>
        <Col lg={8}>
          <Block>
            {labels.nodes.map((node) => {
              const { name } = node;
              return (
                <Link key={name} href={`/archives?label=${name}`}>
                  <Label highlight={label === name}>{name}</Label>
                </Link>
              );
            })}
          </Block>
          {years.map((year: string) => (
            <Block key={year}>
              <Year>{year}</Year>
              {archiveGroups[year].map((node: IGithubIssue) => {
                const { number: id, title, createdAt } = node;

                const linkProps = {
                  href: `/post?id=${id}`,
                  as: `/p/${id}`,
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
          <Loading visiable={pageInfo.hasNextPage} />
        </Col>
        <Col lg={4}>
          <Sidebar dataSource={{ recommend, labels }} />
        </Col>
      </Row>
    </Layout>
  );
};

ArchivesPage.getInitialProps = async (ctx: next.NextContext) => {
  const label = (ctx.query.label || '').toString();
  const api = Api.createWithContext(ctx);

  const [archives, recommend, labels] = await Promise.all([
    api.archives({ label }),
    api.recommend(),
    api.labels(),
  ]);

  return {
    archives,
    recommend,
    labels,
    label,
  };
};

export default ArchivesPage;
