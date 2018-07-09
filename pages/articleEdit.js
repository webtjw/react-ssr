import React, {Component} from 'react'
import PageWrapper from '../components/PageWrapper'

export default class ArticleEdit extends Component {
  static async getInitialProps (context) {
    const {asPath, query} = context
    const props = {route: {path: asPath, query}}

    return props
  }

  constructor () {
    super()

    this.state = {
      allTags: [],
      selectedTags: [],
      addingTag: '',
      time: '',
      inputArticle: ''
    }
  }

  render () {
    const {route} = this.props

    const {state: {inputArticle}} = this

    return <PageWrapper title="编辑文章 · Robin" route={route}>
      <input type="text" value={inputArticle} onChange={e => this.setState({inputArticle: e.target.value})} />
      {inputArticle}
    </PageWrapper>
  }
}