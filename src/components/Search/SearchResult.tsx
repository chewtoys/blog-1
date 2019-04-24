import * as React from 'react';
import withStyles, { WithSheet } from 'react-jss';

import Post from '../Post';

const styles = (theme: any) => ({
  wrapper: {
    paddingBottom: '20px',
  },
});

type ISearchResultProps = WithSheet<typeof styles> & {
  dataSource: IMarkdownRemarkNode[];
}

const SearchResult = (props: ISearchResultProps) => {
  const { classes, dataSource } = props;

  return (
    <div className={classes.wrapper}>
      {dataSource.map((item: IMarkdownRemarkNode) => (
        <Post key={item.id} post={item} simple />
      ))}
    </div>
  );
};

export default withStyles(styles)(SearchResult);
