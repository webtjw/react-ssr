import React, {Component} from 'react'
import NextDocument from '../components/NextDocument'

class ArticleDetail extends Component {
  static async getInitialProps () {
    // 这个页面是否存在 s c 都能渲染的情况？？？？
    const props = {}

    return props
  }

  render () {
    return <NextDocument title="文章标题" description="文章描述" keyword="文章关键词">

    </NextDocument>
  }
}

export default ArticleDetail