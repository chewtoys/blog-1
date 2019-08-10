import * as React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { TypographyStyle } from 'react-typography';
import { ServerStyleSheet } from 'styled-components';

import typography from '../lib/typography';
import { themeColor } from '../config.json';

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
      <Html>
        <Head>
          <style
            id="var"
            dangerouslySetInnerHTML={{
              __html: `
                :root {
                  --theme-color: ${themeColor};
                }
              `,
            }}
          />
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
