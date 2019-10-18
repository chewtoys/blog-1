import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import styled from 'styled-components';
import _ from 'lodash/fp';

import Section from '../Section';
import Markdown from '../Markdown';
import { getConfig } from '../../utils';

const Comment = dynamic(() => import('../Comment'));

interface IAboutProps {
  data: IGithubIssue;
}

const { theme } = getConfig();

const Title = styled.h2`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 15px;
  color: ${theme.color};
`;

const About: React.SFC<IAboutProps> = (props) => {
  const { data } = props;
  const { number: id, title, body } = data;

  return (
    <Section>
      <header>
        <Title>{title}</Title>
      </header>
      <Markdown source={body} />
      <footer>
        <Comment id={id} />
      </footer>
    </Section>
  );
};

export default About;
