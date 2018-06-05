import React, {Component} from 'react'
import Link from 'next/link'
import NextDocument from '../components/NextDocument'
import {getHomeArticle} from '../request'
import {compileMarkdown} from '../utils/article'
import '../components/style/index.scss'

export default class Index extends Component {
  static async getInitialProps() {
    // 首次初始化页面，该函数只会在服务端执行，会得到一个 context 传参
    // 当页面通过 Link 组件导航到另一个路由时，客户端的 getInitialProps 才会被执行，这时候会传一个路由信息对象，和 context 是不一样的，需要做区别对待
    
    const props = {}
    // 获取远程文章数据
    const homeDatas = await getHomeArticle()
    if (homeDatas.success && homeDatas.data && homeDatas.data.length) Object.assign(props, {articles: homeDatas.data})
    
    return props
  }

  buildArticleJSX (articles) {
    return articles.length ? articles.map(item => {
      return <article key={item.id} className="index-article-item m-v-40">
        <h1><Link href={`/article/detail/${item.id}`}><a className="font-24 c-333">{item.title}</a></Link></h1>
        <div className="m-t-30 m-b-40 font-14" data-flex="cross:center">{item.time}</div>
        <div dangerouslySetInnerHTML={compileMarkdown(item.description || item.codeText)} className="article-compile"></div>
        {
          item.tags && item.tags.length ? <div className="attribute font-14" data-flex="dir:left cross:center">
            <img className="svg-14" src="/static/svg/tag.svg" alt="tag"/>
            {
              item.tags.map(tag => <Link key={tag} href={`/tag/${tag}`}><a className="tag-item">{tag}</a></Link>)
            }
          </div> : null
        }
        <div className="more font-14 a-c">
          <Link href={`/article/detail/${item.id}`}><a className="iblock p-v-8 p-h-20">阅读全文</a></Link>
        </div>
      </article>
    }) : null;
  }

  render () {
    const {articles} = this.props

    return <NextDocument title="Robin · 技术小站">
      <div className="main-index">
        {this.buildArticleJSX(articles)}
      </div>
    </NextDocument>
  }
}