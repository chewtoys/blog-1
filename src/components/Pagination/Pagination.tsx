import * as React from 'react';
import _ from 'lodash/fp';
import { Link } from 'gatsby';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import withStyles, { WithSheet } from 'react-jss';

const styles = (theme: any) => ({
  wrapper: {
    margin: '10px 0 40px',
    maxWidth: '650px',
    fontSize: '1.125rem',
    lineHeight: '1.125rem',
    overflow: 'auto',
  },
  before: {
    width: '50%',
    float: 'left',
    textAlign: 'left',
  },
  after: {
    width: '50%',
    float: 'right',
    textAlign: 'right',
  },
  link: {
    width: '100%',
    display: 'inline-block',
    padding: '15px 0',
  },
  icon: {
    position: 'relative',
    top: '3px',
  },
});

type IPagintionProps = WithSheet<typeof styles> & {
  page: number;
  size: number;
  total: number;
};

const Pagination = (props: IPagintionProps) => {
  const { classes, page, size, total } = props;
  const totalPage = Math.ceil(total / size);

  const hasBefore = page !== totalPage;
  const hasAfter = page !== 1;

  return (
    <div className={classes.wrapper}>
      {hasBefore && (
        <div className={classes.before}>
          <Link className={classes.link} to={`/page/${page + 1}`}>
            <FaChevronLeft className={classes.icon} />
            <span>上一页</span>
          </Link>
        </div>
      )}
      {hasAfter && (
        <div className={classes.after}>
          <Link className={classes.link} to={`/page/${page - 1}`}>
            <span>下一页</span>
            <FaChevronRight className={classes.icon} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(Pagination);
