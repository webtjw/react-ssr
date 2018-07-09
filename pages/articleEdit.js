import React, {Component} from 'react'
import PageWrapper from '../components/PageWrapper'
import {getAllTags} from '../request'
import '../components/style/article-edit.scss'

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
      inputArticle: '',
      allTagsVisible: false
    }
  }

  removeSelectedTag (index) {
    const {selectedTags} = this.state
    selectedTags.splice(index, 1)
    this.setState({selectedTags})
  }
  selectTag (tagItem) {

  }
  showAllTags () {
    
  }
  hideAllTags () {
    
  }
  addNewTag (event) {

  }
  async fetchAllTags () {
    const result = await getAllTags()
    if (Array.isArray(result)) this.setState({allTags: result})
  }

  componentDidMount () {
    this.fetchAllTags()
  }
  render () {
    const {
      state: {inputArticle, selectedTags, addingTag, allTagsVisible, allTags},
      props: {route}
    } = this

    return <PageWrapper title="编辑文章 · Robin" route={route}>
      <div className="main-article-edit">
        <div className="p-v-10">
          <span>选择标签：</span>
          {/* selected tags */}
          {selectedTags.map((tag, index) => <span className="tag-item pointer" key={tag} onClick={() => this.removeSelectedTag(index)}>{tag}</span>)}
          <div className="tag-add inline-block relative">
            <input type="text" value={addingTag}
              onFocus={() => this.setState({allTagsVisible: true})}
              onBlur={() => this.hideAllTags()}
              onKeyDown={e => this.addNewTag(e)}
              onChange={e => this.setState({addingTag: e.target.value})} />
            <ul className={`select absolute${allTagsVisible ? '' : ' hide'}`}>
            {
              allTags.map(tag => {
                return tags.indexOf(tag.name) === -1 ? <li key={tag.name} className="pointer" onClick={() => this.selectTag(tag)}>{tag.name}</li> : null
              })
            }
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  }
}