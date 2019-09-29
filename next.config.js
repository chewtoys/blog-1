// next.config.js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withCSS({
    target: 'serverless',
    webpack: (config) => {
      if (config.mode === 'production') {
        if (Array.isArray(config.optimization.minimizer)) {
          config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
        }
      }
      return config;
    },
  }),
);
