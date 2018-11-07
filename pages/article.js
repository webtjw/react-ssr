import React, { Component } from 'react'
import PageWrapper from '../components/PageWrapper'
import ArticleSchemaItem from '../components/ArticleSchemaItem'
import { getArchive } from '../request'

class Article extends Component {
  static async getInitialProps(ctx) {
    const { asPath, query } = ctx
    const props = {route: {path: asPath, query}}
    // 获取远程文章数据
    const result = await getArchive()
    if (result.success && result.data) {
      const archiveDatas = result.data
      // 根据月份区分
      const monthList = []
      let currentMonth = { month: '', list: [] }
      archiveDatas.forEach(item => {
        const itemMonth = item.time.slice(0, item.time.lastIndexOf('-'))
        if (currentMonth.month === itemMonth) {
          currentMonth.list.push(item)
        } else {
          currentMonth = {month: itemMonth, list: [item]}
          monthList.push(currentMonth)
        }
      })
      // 分类排序
      const monthArticles = monthList.map(item => {
        const data = item.month.split('-')
        item.monthText = `${data[0]}-${data[1]}`
        return item
      })
      
      Object.assign(props, {monthArticles})
    }
    return props
  }

  render () {
    const {monthArticles, route, developer} = this.props

    return <PageWrapper title="文章归档 · Robin" description="文章列表,技术文章列表" keyword="技术文章，文章列表" route={route} developer={developer}>
      <div className="main-article p-b-40">
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