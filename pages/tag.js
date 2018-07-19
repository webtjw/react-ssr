import React, {Component} from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import {getAllTags} from '../request'

class Tag extends Component {
  static async getInitialProps (context) {
    const {asPath, pathname, query} = context
    const props = {route: {path: asPath, query}}
  
    const remoteTags = await getAllTags()
    if (remoteTags) props.tags = remoteTags

    return props
  }

  render () {
    const {tags, route, developer} = this.props

    return <PageWrapper title="标签 · Robin" description="标签分类,文章标签" keyword={(tags.length ? tags.map(item => item.name).join(',') + "," : '') + "标签分类,技术标签"} route={route} developer={developer}>
      <div className="p-t-40">
      {
        tags.map(tag => {
          return <Link href={`/tag/${tag.name}`} key={tag.id}>
            <a className="tag-index-item m-r-30 m-b-20 iblock font-16 c-link">
              {tag.name}<span className="font-14">{`（${tag.number}）`}</span>
            </a>
          </Link>
        })
      }
      </div>
    </PageWrapper>
  }
}

export default Tag