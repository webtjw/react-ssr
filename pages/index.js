import React, { Component } from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import { getHomeArticle } from '../request'
import compileMarkdown from '../utils/markdownCompiler'
import '../components/style/index.less'
import '../components/style/article-preview.less'

export default class Index extends Component {
  static async getInitialProps(context) {
    const { asPath, query } = context
    const props = {
      route: { path: asPath, query }
    }
    // 获取远程文章数据
    const result = await getHomeArticle()
    if (result && result.success) {
      props.articles = result.data
    } else {
      props.articles = []
    }
    return props
  }

  buildArticleJSX (articles = []) {
    return articles.length ? articles.map(item => {
      const {antecedent} = item
      const {compileCode} = compileMarkdown(antecedent)
      return <article key={item.id} className="index-article-item m-v-40">
        <h1><Link href={`/article/${item.id}`}><a className="font-24 c-333">{item.title}</a></Link></h1>
        <div className="m-t-30 m-b-40 font-14 c-999">{item.time}</div>
        <div dangerouslySetInnerHTML={{__html: compileCode}} className="article-compile"></div>
        {this.buildTags(item.tags)}
        <div className="more font-14 a-c">
          <Link href={`/article/${item.id}`}><a className="iblock p-v-8 p-h-20">阅读全文</a></Link>
        </div>
      </article>
    }) : null;
  }
  buildTags (tags) {
    if (tags.length) {
      return <div className="attribute m-t-40 m-b-20 font-14" data-flex="dir:left cross:center">
        <img className="svg-14" src="/nextStatic/svg/tag.svg" alt="tag"/>
        {tags.map(tag => <Link key={tag} href={`/tag/${tag}`}><a className="m-l-10 c-999 underline">{tag}</a></Link>)}
      </div>
    } else return null
  }

  render () {
    const {articles, route, developer} = this.props

    return <PageWrapper title="大猫 の 前端技术博客" route={route} developer={developer}>
      <div className="main-index">
        {this.buildArticleJSX(articles)}
        <div className="p-t-40 p-b-10 c-999 a-c font-13">粤ICP备18140188号</div>
      </div>
    </PageWrapper>
  }
}