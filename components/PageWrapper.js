import Head from 'next/head'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Topbar from './Topbar'
import './style/data-flex.scss'
import './style/common.scss'
import './style/article-preview.scss'

class PageWrapper extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    keyword: PropTypes.string,
    route: PropTypes.object.isRequired
  }

  render () {
    const {title, description, keyword, route: {path}} = this.props

    return <div id="app">
      <Head>
        <meta name="description" content={`${description ? description + ',' : ''},前端技术,技术博客,javascript,前端技术学习,前端博客`} key="description" />
        <meta name="keyword" content={`${keyword ? keyword + ',' : ''}前端技术`} key="keyword" />

        <title key="title">{title}</title>
      </Head>

      <Topbar path={path} />

      <div className="wrapper">
        {this.props.children}
      </div>
    </div>
  }
}

export default PageWrapper