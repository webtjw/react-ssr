import Document, {Head} from 'next/document'
import React, {Component} from 'react'
import Topbar from './Topbar'

class NextDocument extends Document {
  render () {
    return <html>
    <Head>
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </html>
  }
}

export default NextDocument