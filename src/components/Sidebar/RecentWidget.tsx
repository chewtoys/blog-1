import * as React from 'react';
import { Link } from 'gatsby';
import withStyle, { WithSheet } from 'react-jss';
import Color from 'color';

import Widget from './Widget';
import { getPostLink, formatPostDate } from '../../utils/helpers';
import SidebarContext, { ISidebarContext } from './context';

const styles = (theme: any) => ({
  item: {
    marginBottom: '10px',
  },
  link: {
    color: Color(theme.blackColor).lighten(0.75).hex(),
    fontSize: '0.9em',
    textDecoration: 'none',
    boxShadow: 'none',
    '&:hover': {
      color: theme.themeColor,
    }
  },
  date: {
    display: 'block',
    marginBottom: '5px',
    color: theme.garyColor,
    fontSize: '0.85em',
    lineHeight: '1rem',
  }
});

type IRecentWidgetProps = WithSheet<typeof styles> & {
  size: number;
};

const RecentWidget = (props: IRecentWidgetProps) => {
  const { classes, size } = props;
  const { posts } = React.useContext(SidebarContext) as ISidebarContext;

  return (
    <Widget title="最新文章">
      {posts.slice(0, size).map((post: IMarkdownRemarkNode) => {
        const { id, frontmatter: { date, title } } = post;
        const postLink = getPostLink(post);

        return (
          <div className={classes.item} key={id}>
            <Link
              className={classes.link}
              to={postLink}
            >
              <span className={classes.date}>
                {formatPostDate(date)}
              </span>
              <span>
                {title}
              </span>
            </Link>
          </div>
        );
      })}
    </Widget>
  );
};

RecentWidget.defaultProps = {
  size: 5,
};

export default withStyle(styles)(RecentWidget);
