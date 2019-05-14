import * as React from 'react';
import withStyles, { WithSheet } from 'react-jss';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { FaSearch } from 'react-icons/fa';

const styles = (theme: any) => ({
  nav: {
    float: 'right',
  },
  menu: {
    margin: '0',
    padding: '0',
    listStyle: 'none',
  },
  menuItem: {
    display: 'inline-block',
    margin: '0',
    padding: '23px 15px',
  },
  search: {
    padding: '23px 0',
    marginRight: '10px',
  },
  link: {
    color: theme.blackColor,
    textTransform: 'uppercase',
    boxShadow: 'none',
    '&:hover': {
      color: theme.themeColor,
    },
    '&.active': {
      color: theme.themeColor,
    },
  },
  searchIcon: {
    position: 'relative',
    top: '5px',
    fontSize: '0.9em',
    verticalAlign: 'top',
  },
});

type IMenuProps = WithSheet<typeof styles> & {
  items: ISiteMenuItem[];
};

const Menu = (props: IMenuProps) => {
  const { classes, items } = props;
  return (
    <nav className={classes.nav}>
      <ul className={classes.menu}>
        {items.map(({ name, path, header }) => {
          if (!header) {
            return null;
          }

          if (path === '/search') {
            return (
              <li key={path} className={classnames(classes.menuItem, classes.search)}>
                <Link to="/search" className={classes.link} aria-label={name}>
                  <FaSearch className={classes.searchIcon} />
                </Link>
              </li>
            );
          }

          return (
            <li className={classes.menuItem} key={path}>
              {path.startsWith('http') ? (
                <a href={path} className={classes.link} target="__blank" aria-label={name}>
                  {name}
                </a>
              ) : (
                <Link to={path} className={classes.link} activeClassName="active" aria-label={name}>
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default withStyles(styles)(Menu);
