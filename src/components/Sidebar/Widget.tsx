import * as React from 'react';
import withStyles, { WithSheet } from 'react-jss';

const styles = (theme: any) => ({
  wrapper: {
    padding: '20px 0',
    '& + &': {
      borderTop: theme.defaultBorder,
    },
  },
  title: {
    margin: '0 0 15px',
    paddingTop: '5px',
    fontSize: '1em',
    fontWeight: '200',
    letterSpacing: '1px',
  },
  content: {
    overflow: 'auto',
  },
});

type IWidgetProps = WithSheet<typeof styles> & {
  title: React.ReactNode;
  children: React.ReactNode;
};

const Widget = (props: IWidgetProps) => {
  const { classes, title, children } = props;

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>
        {title}
      </h3>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

export default withStyles(styles)(Widget);