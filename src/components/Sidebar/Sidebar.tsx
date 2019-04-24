import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import withStyles, { WithSheet } from 'react-jss';

import RecentWidget from './RecentWidget';
import TagsWidget from './TagsWidget';
import ArchivesWidget from './ArchivesWidget';
import { getMarkdownRemarkEdgeNode } from '../../utils/helpers';
import SidebarContext from './context';

const styles = (theme: any) => ({
  sidebar: {
    display: 'block',
  },
  '@media (max-width: 992px)': {
    sidebar: {
      display: 'none',
    },
  },
});

type ISidebarProps = WithSheet<typeof styles>;

const Sidebar = (props: ISidebarProps) => {
  const { classes } = props;
  const data = useStaticQuery(graphql`
    query GetAllBlogTags {
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              tags
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  const posts = getMarkdownRemarkEdgeNode(data);
  const sidebarContext = {
    posts,
  };

  return (
    <SidebarContext.Provider value={sidebarContext}>
      <aside className={classes.sidebar}>
        <RecentWidget />
        <TagsWidget />
        <ArchivesWidget />
      </aside>
    </SidebarContext.Provider>
  );
};

export default withStyles(styles)(Sidebar);
