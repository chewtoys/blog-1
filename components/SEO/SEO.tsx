import * as React from 'react';
import { NextSeo } from 'next-seo';

import { title, description, siteUrl, twitter } from '../../config.json';

interface ISEOProps {
  subTitle?: string;
  excerpt?: string;
  canonical?: string;
}

const SEO: React.SFC<ISEOProps> = (props) => {
  const { subTitle, excerpt, canonical } = props;

  return (
    <NextSeo
      title={subTitle ? `${subTitle} - ${title}` : title}
      description={excerpt || description}
      canonical={canonical || siteUrl}
      twitter={{
        handle: twitter,
        site: twitter,
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default SEO;
