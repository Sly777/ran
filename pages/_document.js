import Document, { Head, Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import AppIcons from '../components/AppIcons';

export default class MyDocument extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args);
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.rewind() };
  }

  // should render on <html>
  helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <head>
  helmetHeadComponents() {
    const keys = Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes')
      .map(el => this.props.helmet[el].toComponent())
      .filter(
        el =>
          el.length > 0 ||
          !(Object.keys(el).length === 0 && el.constructor === Object)
      );

    return keys.length ? keys : [];
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    return (
      <html lang="en" {...this.helmetHtmlAttrComponents()}>
        <Head>
          <meta name="robots" content="index,follow" />
          <meta httpEquiv="expires" content="10800" />
          <meta name="generator" content="RAN! 0.7.1" />
          {this.helmetHeadComponents()}
          {AppIcons()}
          {styleTags}
        </Head>
        <body>
          <div className="root">{main}</div>
          <NextScript />
        </body>
      </html>
    );
  }
}
