import * as React from 'react';
import Head from 'next/head';

import { title, description, icon, themeColor } from '../../config.json';

interface ISEOProps {
  subTitle?: string;
  excerpt?: string;
}

const SEO: React.SFC<ISEOProps> = (props) => {
  const { subTitle = '', excerpt = '' } = props;

  return (
    <Head>
      <title>{subTitle ? `${subTitle} - ${title}` : title}</title>
      <link rel="shortcut icon" href={icon} />
      <meta name="theme-color" content={themeColor} />
      <meta name="description" content={excerpt || description} />
    </Head>
  );
};

export default SEO;
