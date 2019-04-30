import * as React from 'react';
import { FaHeart } from 'react-icons/fa';
import withStyles, { WithSheet } from 'react-jss';
import _ from 'lodash/fp';

import Menu from './Menu';
import Logo from '../Logo';
import FooterContext, { IFooterContext } from './context';

const styles = (theme: any) => ({
  copyright: {
    float: 'left',
    height: '100%',
    width: '50%',
  },
  logo: {
    padding: '0 0 10px',
    fontSize: '1.1rem',
  },
  text: {
    fontSize: '0.9em',
    color: theme.garyColor,
    lineHeight: '1.25rem',
  },
  icon: {
    margin: '0 5px',
    fontSize: '0.75em',
  },
  author: {
    marginRight: '5px',
  },
  link: {
    color: 'inherit',
    margin: '0 5px',
    borderBottom: '1px dotted',
    boxShadow: 'none',
    '&:hover': {
      color: theme.themeColor,
      borderBottom: 'none',
    },
  },
  '@media (max-width: 992px)': {
    copyright: {
      float: 'none',
      width: '100%',
    },
  },
});

type ICopyrightProps = WithSheet<typeof styles>;

const Copyright = (props: ICopyrightProps) => {
  const { classes } = props
  const { title, since, author, menu } = React.useContext(FooterContext) as IFooterContext;
  const currentYear = new Date().getFullYear();

  return (
    <div className={classes.copyright}>
      <Logo className={classes.logo} title={title} />
      <Menu items={menu} />
      <div className={classes.text}>
        <span>
          Copyright &copy; {since} - {currentYear}
        </span>
        <span className={classes.icon}>
          <FaHeart />
        </span>
        <span className={classes.author}>
          {author}
        </span>
      </div>
      <div className={classes.text}>
        <span>
          Power by
          <a className={classes.link} href="https://www.gatsbyjs.org/">
            Gatsbyjs
          </a>
        </span>
        <span>
          Design by
          <a className={classes.link} href="https://github.com/ahonn">
            Ahonn
          </a>
        </span>
      </div>
    </div>
  );
};

export default withStyles(styles)(Copyright);
