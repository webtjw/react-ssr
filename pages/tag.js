import React, {Component} from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import {getAllTags} from '../request'

class Tag extends Component {
  static async getInitialProps (context) {
    const { asPath, query } = context
    const props = {
      route: { path: asPath, query }
    }
  
    const result = await getAllTags()
    if (result.success) {
      const remoteTags = result.data
      if (remoteTags) props.tags = remoteTags.sort((x, y) => y.number - x.number)
    }

    return props
  }

  render () {
    const {tags, route, developer} = this.props

    return <PageWrapper title="标签 · Robin" description="标签分类,文章标签" keyword={(tags.length ? tags.map(item => item.name).join(',') + "," : '') + "标签分类,技术标签"} route={route} developer={developer}>
      <div className="p-t-40">
      {
        tags.map(tag => {
          return <Link href={`/tag/${tag.name}`} key={tag.id}>
            <a className="tag-index-item m-r-30 m-b-20 iblock c-link" style={{fontSize: `${tag.number + 12}px`}}>
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