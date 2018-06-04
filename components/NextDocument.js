import Document from 'next/document'
import Head from 'next/head'
import React, {Component} from 'react'
import Topbar from './Topbar'

class NextDocument extends Document {
  render () {
    return <div id="app">
    <Head>
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <Topbar />
    {this.props.children}
  </div>
  }
}

export default NextDocument