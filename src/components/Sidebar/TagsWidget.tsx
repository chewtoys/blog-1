import * as React from 'react';
import { Link } from 'gatsby';
import { FaHashtag } from 'react-icons/fa';
import withStyles, { WithSheet } from 'react-jss';

import Widget from './Widget';
import { collectTagNamesFromNodes } from '../../utils/helpers';
import SidebarContext, { ISidebarContext } from './context';
import { TAG_SYMBOL } from '../../consts';

const styles = (theme: any) => ({
  item: {
    fontSize: '0.85em',
  },
  link: {
    float: 'left',
    margin: '0 8px 8px 0',
    padding: '7px',
    color: theme.garyColor,
    border: theme.defaultBorder,
    borderRadius: '3px',
    boxShadow: 'none',
    '&:hover': {
      color: theme.themeColor,
      borderColor: theme.themeColor,
    },
  },
  icon: {
    marginRight: '1px',
    fontSize: '0.75em',
    lineHeight: '1rem',
  },
});

type ITagsWidgetProps = WithSheet<typeof styles> & {
  size: number;
};

const TagsWidget = (props: ITagsWidgetProps) => {
  const { classes, size } = props;
  const { posts } = React.useContext(SidebarContext) as ISidebarContext;
  const tagNames = collectTagNamesFromNodes(posts);

  return (
    <Widget title="标签">
      {tagNames.slice(0, size).map((name: string) => (
        <div className={classes.item} key={name}>
          <Link
            className={classes.link}
            to={`/search?keyword=${TAG_SYMBOL} ${name}`}
          >
            <FaHashtag className={classes.icon} />
            {name}
          </Link>
        </div>
      ))}
    </Widget>
  );
};

TagsWidget.defaultProps = {
  size: 20,
};

export default withStyles(styles)(TagsWidget);
