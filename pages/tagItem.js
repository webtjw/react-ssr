import React, {Component} from 'react'
import Link from 'next/link'
import NextDocument from '../components/NextDocument'
import {getArticleByTag} from '../request'
import ArticleSchemaItem from '../components/ArticleSchemaItem'
import '../components/style/tag.scss'

class TagItem extends Component {
  static async getInitialProps (context) {
    // s + c
    const props = {}
  
    const tag = decodeURIComponent(context.req.url.match(/^\/tag\/(\S+)$/)[1])
    props.tag = tag

    const result = await getArticleByTag(tag)
    if (result.success) props.articles = result.data
    return props
  }

  render () {
    const {articles, tag} = this.props

    return <NextDocument title={`${tag} · 标签`}>
      <div className="tag-item-page p-t-40">
        <div className="p-b-40" data-flex="dir:left cross:center">
          <img className="svg-16" src='/static/svg/tag.svg' alt="tag"/>
          <h1 className="font-18 m-l-18">"{tag}"</h1>
        </div>
        <ul className="article-list">
        {
          articles.map(article => <ArticleSchemaItem key={article.id} article={article} history={this.props.history} />)
        }
        </ul>
      </div>
  </NextDocument>
  }
}

export default TagItem