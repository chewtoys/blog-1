import * as React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { TypographyStyle } from 'react-typography';
import { ServerStyleSheet } from 'styled-components';

import typography from '../lib/typography';
import { title, icon, themeColor, rss } from '../config.json';

const globalStyleVariables = `
  :root {
    --theme-color: ${themeColor};
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
          <meta name="theme-color" content={themeColor} />
          <link rel="shortcut icon" href={icon} />
          <link rel="alternate" type="application/rss+xml" title={title} href={rss} />
          <style id="variables" dangerouslySetInnerHTML={{ __html: globalStyleVariables }} />
          <TypographyStyle typography={typography} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
