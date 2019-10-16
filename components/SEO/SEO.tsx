import * as React from 'react';
import { NextSeo } from 'next-seo';
import _ from 'lodash/fp';

import { getConfig } from '../../utils';

interface ISEOProps {
  subTitle?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

const { site, social } = getConfig();

const defaultImage = {
  url: `${site.url}${site.icon}`,
  alt: site.title,
};

const SEO: React.SFC<ISEOProps> = (props) => {
  const { subTitle, description: desc, canonical, image } = props;

  const title = subTitle ? `${subTitle} - ${site.title}` : site.title;
  const description = desc || site.description;
  const url = canonical || site.siteUrl;

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
        handle: '@' + social.twitter,
        site: '@' + social.twitter,
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default SEO;
