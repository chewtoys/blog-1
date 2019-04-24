import * as React from 'react';

export type IFooterContext = {
  title: ISiteMetadata["title"];
  since: ISiteMetadata["since"];
  author: ISiteMetadata["author"];
  menu: ISiteMetadata["menu"];
  socials: ISiteMetadata["socials"],
  friends: ISiteMetadata["friends"],
};

const FooterContext = React.createContext({});

export default FooterContext;
