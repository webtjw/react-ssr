import React, {Component} from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import {getAllTags} from '../request'
import '../components/style/tag.scss'

class Tag extends Component {
  static async getInitialProps (context) {
    const {asPath, pathname, query} = context
    const props = {route: {path: asPath, query}}
  
    const result = await getAllTags()
    if (result.success) props.tags = result.data

    return props
  }

  render () {
    const {tags, route} = this.props

    return <PageWrapper title="标签 · Robin" route={route}>
      <div className="p-t-40">
      {
        tags.map(tag => {
          return <Link href={`/tag/${tag.name}`} key={tag.id}>
            <a className="tag-index-item m-r-30 m-b-20 iblock font-16">
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