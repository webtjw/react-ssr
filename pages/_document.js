import Document, {Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
          <meta name="renderer" content="webkit" />
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"/>

          <link rel="shortcut icon" href="/ssrStatic/favicon.ico" type="image/x-icon" />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}