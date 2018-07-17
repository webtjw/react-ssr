import React, {Component} from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import {compileMarkdown} from '../utils/article'
import compileMarkdown2 from '../utils/markdownCompiler'
import {getArticleDetail} from '../request'
import '../components/style/article-preview.less'

class ArticleDetail extends Component {
  static async getInitialProps (context) {
    const {asPath, query, req} = context
    const props = {route: {path: asPath, query}}
    // 根据 cookies 字段判断请求者是否有登陆信息（后续可以请求后端服务验证身份），如有则可开放开发者模式
    props.isDeveloper = req && req.headers.cookie && req.headers.cookie.indexOf('authentication') > -1
    // 获取 id 再拉取远程数据
    const {id} = query
    const articleDetail = await getArticleDetail(id)
    if (articleDetail) props.article = articleDetail
    return props
  }

  render () {
    const {article, article: {id, title}, route, isDeveloper} = this.props
    const {compileCode} = compileMarkdown2(article.codeText)

    return <PageWrapper title={title} description={title} keyword={title} route={route}>
      <article className="article-detail p-v-30 m-v-20">
        <h1 className="font-24">{article.title} {isDeveloper ? <Link href={`/article/edit/${id}`}><a className="c-link">edit</a></Link> : null}</h1>
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
        <div className="a-c font-20 p-v-40">（完）</div>
      </article>
    </PageWrapper>
  }
}

export default ArticleDetail