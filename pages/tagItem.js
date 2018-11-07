import React, {Component} from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import {getArticleByTag} from '../request'
import ArticleSchemaItem from '../components/ArticleSchemaItem'

class TagItem extends Component {
  static async getInitialProps (context) {
    const {asPath, pathname, query} = context
    const props = {route: {path: asPath, query}}
  
    const tag = decodeURIComponent(context.req.url.match(/^\/tag\/(\S+)$/)[1])
    props.tag = tag

    const result = await getArticleByTag(tag)
    if (result && result.success) {
      const tagArticles = result.data
      props.articles = tagArticles
    }
    return props
  }

  render () {
    const {articles, tag, route} = this.props

    return <PageWrapper title={`${tag} · 标签`} description="标签分类,文章标签" keyword="标签分类,技术标签" route={route}>
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
  </PageWrapper>
  }
}

export default TagItem