import * as React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { TypographyStyle } from 'react-typography';
import { ServerStyleSheet } from 'styled-components';

import typography from '../lib/typography';
import { getConfig } from '../utils';

const { site, theme } = getConfig();

const globalStyleVariables = `
  :root {
    --theme-color: ${theme.color};
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="zh-Hans">
        <Head>
          <meta name="theme-color" content={theme.color} />
          <link rel="shortcut icon" href={site.icon} />
          <link rel="alternate" type="application/rss+xml" title={site.title} href={site.rss} />
          <style id="variables" dangerouslySetInnerHTML={{ __html: globalStyleVariables }} />
          <TypographyStyle typography={typography} />
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Serif+SC&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
