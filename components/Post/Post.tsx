import * as React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import styled from 'styled-components';
import _ from 'lodash/fp';

import Card from '../Card';
import Markdown from '../Markdown';
import Comment from '../Comment';
import { themeColor } from '../../config.json';

interface IPostProps {
  data: IGithubIssue;
  excerpt?: boolean;
}

interface ITitleProps {
  excerpt: boolean | undefined;
}

// tslint:disable-next-line
const Title = styled.h2<ITitleProps>`
  margin-top: 0;
  margin-bottom: 10px;
  color: ${themeColor};
  font-size: 1.85rem;
  cursor: ${(props) => (props.excerpt ? 'pointer' : 'initial')};
`;

const Meta = styled.div`
  margin-bottom: 1rem;
  color: #7a7a7a;
  font-size: 14px;
`;

const DateTime = styled.time`
  margin-right: 10px;
`;

const Labels = styled.span`
  margin-right: 10px;
`;

const PagePV = styled.span`
  margin-right: 10px;
`;

const Label = styled.a`
  box-shadow: none;
  cursor: pointer;

  & + & {
    margin-left: 5px;
  }
`;

const ReadMore = styled.span`
  font-size: 0.9rem;
  color: ${themeColor};
  cursor: pointer;
`;

const Post: React.SFC<IPostProps> = (props) => {
  const { data, excerpt } = props;
  const { number: id, title, body, createdAt, labels } = data;

  const linkProps = {
    href: `/post?id=${id}`,
    as: `/post/${id}`,
    prefetch: true,
  };

  return (
    <Card>
      <div>
        <Link {...linkProps}>
          <Title excerpt={excerpt}>{title}</Title>
        </Link>
        <Meta>
          <DateTime>{format(createdAt, 'YYYY年MM月DD日')}</DateTime>
          <Labels>
            {labels.nodes.map(({ name }) => (
              <Link href={`/archives?label=${name}`} key={name}>
                <Label key={name}>#{name}</Label>
              </Link>
            ))}
          </Labels>
          {!excerpt && (
            <PagePV id="busuanzi_container_page_pv" style={{ display: 'none' }}>
              本文总阅读量 <span id="busuanzi_value_page_pv" /> 次
            </PagePV>
          )}
        </Meta>
      </div>
      <Markdown source={body} excerpt={excerpt} />
      {excerpt ? (
        <Link {...linkProps}>
          <ReadMore>阅读更多...</ReadMore>
        </Link>
      ) : (
        <Comment id={id} />
      )}
    </Card>
  );
};

Post.defaultProps = {
  excerpt: false,
};

export default Post;
