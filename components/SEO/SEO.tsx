import * as React from 'react';
import { NextSeo } from 'next-seo';

import config, { icon, twitter } from '../../config.json';

interface ISEOProps {
  subTitle?: string;
  description?: string;
  canonical?: string;
}

const SEO: React.SFC<ISEOProps> = (props) => {
  const { subTitle, description: desc, canonical } = props;

  const title = subTitle ? `${subTitle} - ${config.title}` : config.title;
  const description = desc || config.description;
  const url = canonical || config.siteUrl;

  const ogType = subTitle ? 'article' : 'website';
  const ogImageUrl = `${config.siteUrl}/${icon}`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        type: ogType,
        images: [{ url: ogImageUrl }],
      }}
      twitter={{
        handle: twitter,
        site: twitter,
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default SEO;
