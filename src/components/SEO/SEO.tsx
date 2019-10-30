import * as React from 'react';
import { NextSeo } from 'next-seo';
import _ from 'lodash/fp';

import { getConfig } from '../../utils';

const { site, social } = getConfig();

interface ISEOProps {
  subTitle?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

const SEO: React.SFC<ISEOProps> = (props) => {
  const { subTitle, description: desc, canonical, image } = props;

  const title = subTitle ? `${subTitle} - ${site.title}` : site.title;
  const description = desc || site.description;
  const url = canonical || site.siteUrl;

  const ogType = subTitle ? 'article' : 'website';
  const ogImage = image && { url: image, alt: subTitle };

  const openGraph = _.omitBy(_.isEmpty, {
    url,
    title,
    description,
    type: ogType,
    images: ogImage && [ogImage],
  });

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={openGraph}
      twitter={{
        handle: '@' + social.twitter,
        site: '@' + social.twitter,
        cardType: 'summary',
      }}
    />
  );
};

export default SEO;
