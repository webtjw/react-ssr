import Document from 'next/document'
import Head from 'next/head'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Topbar from './Topbar'
import 'flex.css/dist/data-flex.css'
import './style/common.scss'
import './style/article-preview.scss'

class NextDocument extends Document {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    keyword: PropTypes.string
  }

  render () {
    const {title, description, keyword} = this.props

    return <div id="app">
    <Head>
      <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"/>
      <meta name="description" content={`${description || ''},前端技术,技术博客,javascript,前端技术学习,前端博客`}/>
      <meta name="keyword" content={`${keyword || ''},前端技术`}/>

      <link rel="shortcut icon" href="/ssrStatic/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="/_next/static/style.css" />

      <title key="title">{title}</title>
    </Head>

    <Topbar />

    <div className="wrapper">
      {this.props.children}
    </div>
  </div>
  }
}

export default NextDocument