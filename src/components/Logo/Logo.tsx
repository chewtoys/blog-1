import * as React from 'react';
import { navigate } from 'gatsby';
import withStyles,{ WithSheet } from 'react-jss';
import classnames from 'classnames';

// @ts-ignore
import iconPng from '../../assets/icon.png';

const styles = (theme: any) => ({
  wrapper: {
    display: 'inline-block',
    fontSize: '20px',
    padding: '23px 0',
    cursor: 'pointer',
  },
  link: {
    margin: '0',
    color: '#333',
    fontSize: 'inherit',
    textTransform: 'uppercase',
    boxShadow: 'none',
  },
  icon: {
    display: 'inline-block',
    position: 'relative',
    top: '3px',
    width: '20px',
    height: '20px',
    marginRight: '5px',
    marginBottom: '0',
  }
});

type ILogoProps = WithSheet<typeof styles> & {
  title: string;
  className?: string;
};

const Logo = (props: ILogoProps) => {
  const { classes, title, className } = props;

  const logoClassNames = classnames(classes.wrapper, className);

  return (
    <div className={logoClassNames}>
      <h1 className={classes.link} onClick={() => navigate('/')}>
        <img className={classes.icon} src={iconPng} alt={title} />
        {title}
      </h1>
    </div>
  );
};

export default withStyles(styles)(Logo);
