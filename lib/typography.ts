import Typography, { TypographyOptions } from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

import { themeColor } from '../config.json';

Wordpress2016.headerFontFamily = ['Georgia', 'serif'];
Wordpress2016.bodyFontFamily = [
  '-apple-system',
  'Helvetica Neue',
  'PingFang SC',
  'Microsoft YaHei',
  'WenQuanYi Micro Hei',
  'sans-serif',
];


(Wordpress2016 as TypographyOptions).overrideThemeStyles = ({ rhythm }) => ({
  body: {
    color: '#2e3444',
    backgroundColor: '#f7f7f7',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: Wordpress2016.headerFontFamily.join(','),
    fontWeight: '400',
    marginTop: '1.75rem',
    marginBottom: '1.25rem',
  },
  a: {
    boxShadow: `0 1px 0 0 ${themeColor}`,
    color: themeColor,
    textDecoration: 'none',
  },
  p: {
    lineHeight: rhythm(1),
    marginBottom: rhythm(1 / 2),
  },
  ul: {
    listStyle: 'inside',
  },
  li: {
    lineHeight: rhythm(1),
    marginBottom: '0',
  },
});

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
