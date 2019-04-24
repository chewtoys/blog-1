import * as React from 'react';
import { Link } from 'gatsby';
import withStyles, { WithSheet } from 'react-jss';
import _ from 'lodash/fp';

const styles = (theme: any) => ({
  menu: {
    margin: '0',
    padding: '0 0 10px',
    listStyle: 'none',
  },
  menuItem: {
    display: 'inline-block',
    margin: '0',
    color: theme.garyColor,
    textTransform: 'uppercase',
    '& + &::before': {
      content: `"|"`,
      margin: '0 10px',
      fontSize: '0.9em',
    },
  },
  menuLink: {
    fontSize: '0.9em',
    color: theme.garyColor,
    textTransform: 'upppercase',
    boxShadow: 'none',
  },
});

type IMenuProps = WithSheet<typeof styles> & {
  items: ISiteMenuItem[];
};

const Menu = (props: IMenuProps) => {
  const { classes, items } = props;
  return (
    <ul className={classes.menu}>
      {items.map(({ name, path }) => (
        <li className={classes.menuItem} key={path}>
          {_.startsWith('http', path) ? (
            <a href={path} className={classes.menuLink} target="__blank">
              {name}
            </a>
          ) : (
            <Link to={path} className={classes.menuLink}>
              {name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default withStyles(styles)(Menu);