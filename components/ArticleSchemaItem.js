import React, {Component} from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import './style/articleSchemaItem.scss'

class ArticleSchemaItem extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  }

  articleTagClick (e, tag) {
    e.stopPropagation()
    Router.push(`/tag/${tag}`)
  }

  render () {
    const {article} = this.props

    return <li onClick={() => Router.push(`/article/${article.id}`)} className="article-schema-item font-15 pointer p-v-18" data-flex="dir:left cross:center">
      <div data-flex-box="0" className="article-schema-title">{article.title}</div>
      {
        article.tags && article.tags.length ? <div className="m-l-20 font-13" data-flex-box="1" data-flex="dir:left cross:center">
          <img className="svg-14" src="/static/svg/tag.svg" alt="tag"/>
          {
            article.tags.map(tag => <div key={tag} onClick={e => this.articleTagClick(e, tag)} data-flex-box="0" className="tag-another m-l-8 c-999">{tag}</div>)
          }
        </div> : null
      }
      <span className="time font-13" flex-box="0">{article.time}</span>
    </li>
  }
}

export default ArticleSchemaItem