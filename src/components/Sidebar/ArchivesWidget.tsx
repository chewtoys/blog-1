import * as React from 'react';
import format from 'date-fns/format';
import { Link } from 'gatsby';
import { FaCaretRight } from 'react-icons/fa';
import withStyles, { WithSheet } from 'react-jss';

import Widget from './Widget';
import { groupByDateFromNodes } from '../../utils/helpers';
import SidebarContext, { ISidebarContext } from './context';
import { DATE_SYMBOL } from '../../consts';

const styles = (theme: any) => ({
  item: {
    display: 'block',
    padding: '3px 0',
  },
  link: {
    color: theme.garyColor,
    fontSize: '0.9em',
    boxShadow: 'none',
    lineHeight: '1rem',
    '&:hover': {
      color: theme.themeColor,
    },
  },
  icon: {
    position: 'relative',
    top: '3px',
    marginRight: '2px',
  },
  text: {
    letterSpacing: '1px',
  },
  count: {
    paddingLeft: '3px',
    color: theme.themeColor,
    fontSize: '0.85em',
  }
});

type IArchivesWidgetProps = WithSheet<typeof styles> & {
  size: number;
};

const ArchivesWidget = (props: IArchivesWidgetProps) => {
  const { classes, size } = props;

  const { posts } = React.useContext(SidebarContext) as ISidebarContext;
  const archiveGroup = groupByDateFromNodes(posts);

  return (
    <Widget title="归档">
      {archiveGroup.slice(0, size).map(([date, posts]: [string, IMarkdownRemarkNode[]]) => (
        <div className={classes.item} key={date}>
          <Link
            className={classes.link}
            to={`/search?keyword=${DATE_SYMBOL} ${date}`}
          >
            <span className={classes.icon}>
              <FaCaretRight />
            </span>
            <span className={classes.text}>
              <span>
                {format(date, 'YYYY年MM月')}
              </span>
              <span className={classes.count}>
                ({posts.length})
              </span>
            </span>
          </Link>
        </div>
      ))}
    </Widget>
  );
};

ArchivesWidget.defaultProps = {
  size: 12,
};

export default withStyles(styles)(ArchivesWidget);
