import * as React from 'react';
import Link from 'next/link';
import _ from 'lodash/fp';
import styled from 'styled-components';

import Section from '../Section';
import { getConfig } from '../../utils';

const MIN_LABEL_SIZE = 12;
const MAX_LABEL_SIZE = 16;

const { theme } = getConfig();

interface ILabelsWidgetProps {
  labels: IGithubLabels;
  maxSize?: number;
  minSize?: number;
}

interface ILabelProps {
  size: number;
}

const Labels = styled.div`
  overflow: auto;
`;

const Label = styled.span<ILabelProps>`
  display: inline-block;
  color: #242424;
  font-size: ${(props) => `${props.size}px`};
  padding: 7px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 3px;
  cursor: pointer;
  transition: color 0.2s ease-out;

  &::before {
    content: '#';
  }

  &:hover {
    color: ${theme.color};
    border-color: ${theme.color};
  }
`;

const getMaxTotalCountForLabels = _.compose(
  _.get('issues.totalCount'),
  _.maxBy('issues.totalCount'),
  _.get('nodes'),
);

const LabelsWidget: React.SFC<ILabelsWidgetProps> = (props) => {
  const { labels, maxSize = MAX_LABEL_SIZE, minSize = MIN_LABEL_SIZE } = props;
  const sizeGap = maxSize - minSize;

  const maxTotalCount = getMaxTotalCountForLabels(labels);
  const getLabelSizeByCount = (totalCount: number): number => {
    const rate = totalCount / maxTotalCount;
    const size = minSize + Math.ceil(rate * sizeGap);
    return size;
  };

  return (
    <Section title="标签">
      <Labels>
        {labels.nodes.map((node) => {
          const { name, issues } = node;
          const labelSize = getLabelSizeByCount(issues.totalCount);

          return (
            <Link href={`/archives?label=${name}`} key={name}>
              <Label key={name} size={labelSize}>
                {name}
              </Label>
            </Link>
          );
        })}
      </Labels>
    </Section>
  );
};

export default LabelsWidget;
