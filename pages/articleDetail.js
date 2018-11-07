import React, {Component} from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import compileMarkdown from '../utils/markdownCompiler'
import {getArticleDetail} from '../request'
import '../components/style/article-preview.less'

class ArticleDetail extends Component {
  static async getInitialProps (context) {
    const {asPath, query, req} = context
    const props = {route: {path: asPath, query}}
    // 获取 id 再拉取远程数据
    const { id } = query
    const result = await getArticleDetail(id)
    if (result && result.success) {
      const articleDetail = result.data
      props.article = articleDetail
    }
    return props
  }

  render () {
    const {article, article: {id, title}, route, developer} = this.props
    const {compileCode} = compileMarkdown(article.codeText)

    return <PageWrapper title={title} description={title} keyword={title} route={route} developer={developer}>
      <article className="article-detail p-v-30 m-v-20">
        <h1 className="font-24">{article.title} {developer ? <Link href={`/article/edit/${id}`}><a className="c-link">edit</a></Link> : null}</h1>
        <div className="article-attrs font-13 m-t-30 m-b-40" data-flex="cross:center">
          <div className="m-r-40">{article.time}</div>
          {
            article.tags && article.tags.length ? <div data-flex="dir:left main:center cross:center">
              <img src="/static/svg/tag.svg" alt="tag" className="svg-14 icon-tag" />
              {
                article.tags.map(tag => <Link key={tag} href={`/tag/${tag}`}><a className="m-l-8">{tag}</a></Link>)
              }
            </div> : null
          }
        </div>
        <div dangerouslySetInnerHTML={{__html: compileCode}} className="article-compile"></div>
        <div className="p-v-40"></div>
      </article>
    </PageWrapper>
  }
}

export default ArticleDetail