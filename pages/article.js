import React, {Component} from 'react'
import PageWrapper from '../components/PageWrapper'
import ArticleSchemaItem from '../components/ArticleSchemaItem'
import {getArchive} from '../request'

class Article extends Component {
  static async getInitialProps(context) {
    const {asPath, pathname, query} = context
    const props = {route: {path: asPath, query}}
    // 获取远程文章数据
    const archiveDatas = await getArchive()
    if (archiveDatas.success && archiveDatas.data) {
      // 分类排序
      const groupingData = []
      const {recentMonth, lastMonth, recentYear, overAYear} = archiveDatas.data
      recentMonth && recentMonth.length && groupingData.push({title: '最近一个月', data: recentMonth})
      lastMonth && lastMonth.length && groupingData.push({title: '上个月', data: lastMonth})
      recentYear && recentYear.length && groupingData.push({title: '最近一年', data: recentYear})
      overAYear && overAYear.length && groupingData.push({title: '一年前', data: overAYear})

      Object.assign(props, {articles: groupingData})
    }
    return props
  }

  render () {
    const {articles, route} = this.props

    return <PageWrapper title="文章归档 · Robin" route={route}>
      <div className="main-article">
      {
        articles.map(monthItem => {
          return <div className="month-item" key={monthItem.title}>
            <h1 className="title font-20 p-t-40 p-b-30">
              <span style={{borderBottom: '1px solid #666', lineHeight: 1.2}}>"{monthItem.title}"</span>
            </h1>
            <ul>
            {
              monthItem.data.map(article => <ArticleSchemaItem article={article} key={article.id} />)
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