import * as React from 'react';
import withStyles, { WithSheet } from 'react-jss';

import useGitalk from '../../hooks/useGitalk';
import useWindowScroll from '../../hooks/useWindowScroll';
import { isInViewportByElementId, replaceUrlWithoutRefresh } from '../../utils/helpers';

import 'gitalk/dist/gitalk.css';

const styles = (theme: any) => ({
  comment: {
    marginBottom: '50px',
    '& .gt-container': {
      '& a': {
        color: theme.themeColor,
        boxShadow: 'none',
      },
      '& svg': {
        fill: theme.themeColor,
      },
      '& .gt-ico-github svg': {
        fill: theme.blackColor,
      },
      '& .gt-btn': {
        backgroundColor: theme.themeColor,
        borderColor: theme.themeColor,
      },
      '& .gt-btn-preview': {
        color: theme.themeColor,
        borderColor: theme.themeColor,
        backgroundColor: '#fff',
      },
      '& .gt-comment-content': {
        backgroundColor: '#fff',
      },
      '& .email-hidden-toggle':{
        display: 'none',
      },
      '& .email-hidden-reply':{
        display: 'none',
      },
    },
  },
});

type ICommentProps = WithSheet<typeof styles> & {
  id: number;
}

const Commemt = (props: ICommentProps) => {
  const { classes, id } = props;
  useGitalk('comment', id);

  // add `#comment` to url when scroll comment element into viewport
  useWindowScroll(() => {
    if (isInViewportByElementId('comment')) {
      replaceUrlWithoutRefresh(`${location.pathname}#comment`);
    } else if (location.hash) {
      replaceUrlWithoutRefresh(location.pathname);
    }
  }, /* resize = */ true);

  return <div id="comment" className={classes.comment} />;
};

export default withStyles(styles)(Commemt);
