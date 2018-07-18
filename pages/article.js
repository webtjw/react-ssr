import React, {Component} from 'react'
import PageWrapper from '../components/PageWrapper'
import ArticleSchemaItem from '../components/ArticleSchemaItem'
import {getArchive} from '../request'

class Article extends Component {
  static async getInitialProps(ctx) {
    const {asPath, pathname, query} = ctx
    const props = {route: {path: asPath, query}}
    // 获取远程文章数据
    const archiveDatas = await getArchive()
    if (archiveDatas) {
      // 分类排序
      const monthArticles = archiveDatas.map(item => {
        const data = item.month.split('-')
        item.monthText = `${data[0]}-${data[1]}`
        return item
      })
      
      Object.assign(props, {monthArticles})
    }
    return props
  }

  render () {
    const {monthArticles, route} = this.props

    return <PageWrapper title="文章归档 · Robin" description="文章列表,技术文章列表" keyword="技术文章，文章列表" route={route}>
      <div className="main-article">
      {
        monthArticles.map(monthItem => {
          return <div className="month-item" key={monthItem.monthText}>
            <h1 className="title font-20 p-t-40 p-b-30">
              <span>{monthItem.monthText}</span>
            </h1>
            <ul>
            {
              monthItem.list.map(article => <ArticleSchemaItem article={article} key={article.id} />)
            }
            </ul>
          </div>
        })
      }
      </div>
    </PageWrapper>
  }
}

export default Article