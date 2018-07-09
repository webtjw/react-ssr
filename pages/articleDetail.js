import React, {Component} from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import {compileMarkdown} from '../utils/article'
import {getArticleDetail} from '../request'
import '../components/style/article-detail.scss'

class ArticleDetail extends Component {
  static async getInitialProps (context) {
    const {asPath, pathname, query} = context
    const props = {route: {path: asPath, query}}
    // 获取 id 再拉取远程数据
    const id = context.req.url.match(/\/([0-9]+)$/)[1]
    const result = await getArticleDetail(id)
    if (result.success) {
      props.article = result.data
    }
    return props
  }

  render () {
    const {article, article: {id}, route} = this.props

    return <PageWrapper title="文章标题" description="文章描述" keyword="文章关键词" route={route}>
      <article className="article-detail p-v-30 m-v-20">
        <h1 className="font-24">{article.title} {true ? <Link href={`/article/edit/${id}`}><a>edit</a></Link> : null}</h1>
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
        <div dangerouslySetInnerHTML={compileMarkdown(article.codeText || '')} className="article-compile"></div>
        <div className="a-c font-20 p-v-40">（完）</div>
      </article>
    </PageWrapper>
  }
}

export default ArticleDetail