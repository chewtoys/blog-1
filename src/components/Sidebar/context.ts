import * as React from 'react';

export type ISidebarContext = {
  posts: IMarkdownRemarkNode[];
};

const SidebarContext = React.createContext({});

export default SidebarContext;
