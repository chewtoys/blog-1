import * as React from 'react';
import { NextSeo } from 'next-seo';
import _ from 'lodash/fp';

import config, { icon, twitter } from '../../config.json';

interface ISEOProps {
  subTitle?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

const defaultImage = {
  url: `${config.siteUrl}${icon}`,
  alt: config.title,
};

const SEO: React.SFC<ISEOProps> = (props) => {
  const { subTitle, description: desc, canonical, image } = props;

  const title = subTitle ? `${subTitle} - ${config.title}` : config.title;
  const description = desc || config.description;
  const url = canonical || config.siteUrl;

  const ogType = subTitle ? 'article' : 'website';
  const ogImage = image ? { url: image, alt: subTitle } : defaultImage;

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
        images: [ogImage],
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
