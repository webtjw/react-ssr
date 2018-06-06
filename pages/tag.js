import React, {Component} from 'react'
import Link from 'next/link'
import NextDocument from '../components/NextDocument'
import {getAllTags} from '../request'
import '../components/style/tag.scss'

class Tag extends Component {
  static async getInitialProps () {
    // s + c
    const props = {}
  
    const result = await getAllTags()
    if (result.success) props.tags = result.data

    return props
  }

  render () {
    const {tags} = this.props

    return <NextDocument title="标签 · Robin">
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
    </NextDocument>
  }
}

export default Tag