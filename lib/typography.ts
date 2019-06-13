import Typography, { TypographyOptions } from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

import { themeColor } from '../config.json';

(Wordpress2016 as TypographyOptions).overrideThemeStyles = ({ rhythm }) => ({
  body: {
    color: '#f7f7f7',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: Wordpress2016.headerFontFamily.join(','),
    fontWeight: '400',
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
  li: {
    lineHeight: rhythm(1),
    marginBottom: '0',
  },
  blockquote: {
    marginRight: 0,
    marginTop: rhythm(1),
    paddingTop: rhythm(1 / 3),
    paddingBottom: rhythm(1 / 3),
    background: '#fafafa',
    fontSize: rhythm(4 / 7),
    borderLeft: `${rhythm(1 / 8)} solid ${themeColor}`,
  },
});

Wordpress2016.headerFontFamily = ['Georgia', 'serif'];
Wordpress2016.bodyFontFamily = [
  '-apple-system',
  'Helvetica Neue',
  'PingFang SC',
  'Microsoft YaHei',
  'WenQuanYi Micro Hei',
  'sans-serif',
];

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
