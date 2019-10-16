// next.config.js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { DefinePlugin } = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

const CONFIG = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './_config.yml'), 'utf8'));

module.exports = withBundleAnalyzer(
  withCSS({
    target: 'serverless',
    webpack: (webpackConfig) => {
      if (webpackConfig.mode === 'production') {
        if (Array.isArray(webpackConfig.optimization.minimizer)) {
          webpackConfig.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
        }
      }
      webpackConfig.plugins.push(
        new DefinePlugin({
          'process.env.GA_TRACKING_ID': JSON.stringify(process.env.GA_TRACKING_ID),
          'process.env.GA_OPTIMIZE_ID': JSON.stringify(process.env.GA_OPTIMIZE_ID),
          'process.env.GITALK_CLIENT_ID': JSON.stringify(process.env.GITALK_CLIENT_ID),
          'process.env.GITALK_CLIENT_SECRET': JSON.stringify(process.env.GITALK_CLIENT_SECRET),
          'process.env.CONFIG': JSON.stringify(CONFIG),
        }),
      );
      return webpackConfig;
    },
  }),
);
