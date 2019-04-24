import * as React from 'react';
import withStyles, { WithSheet } from 'react-jss';

import FooterContext, { IFooterContext } from './context';

const styles = (theme: any) => ({
  extra: {
    float: 'right',
    display: 'table',
    width: '40%',
    tableLayout: 'fixed',
  },
  cellWrapper: {
    display: 'table-cell',
    verticalAlign: 'top',
  },
  cell: {
    display: 'inline-block',
  },
  title: {
    display: 'inline-block',
    fontSize: '0.9em',
    marginBottom: '10px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  items: {
    display: 'block',
    margin: '0',
    padding: '0',
  },
  item: {
    color: theme.garyColor,
  },
  link: {
    fontSize: '0.9em',
    color: theme.garyColor,
    textTransform: 'capitalize',
    borderBottom: '1px dotted',
    boxShadow: 'none',
    '&:hover': {
      color: theme.themeColor,
      borderBottom: 'none',
    }
  },
  '@media (max-width: 992px)': {
    extra: {
      display: 'none',
    },
  },
});

type IExtraLinksProps = WithSheet<typeof styles>;

const ExtraLinks = (props: IExtraLinksProps) => {
  const { classes } = props;
  const { socials, friends } = React.useContext(FooterContext) as IFooterContext;

  return (
    <div className={classes.extra}>
      <div className={classes.cellWrapper}>
        <div className={classes.cell}>
          <span className={classes.title}>
            socials / 社交
          </span>
          <ul className={classes.items}>
            {socials.map(({ name, link }) => (
              <li className={classes.item} key={link}>
                <a className={classes.link} href={link}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={classes.cellWrapper}>
        <div className={classes.cell}>
          <span className={classes.title}>
            friends / 友链
          </span>
          <ul className={classes.items}>
            {friends.map(({ name, link }) => (
              <li className={classes.item} key={link}>
                <a className={classes.link} href={link}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ExtraLinks);
