import React, {Component} from 'react'
import PageWrapper from '../components/PageWrapper'
import {getAllTags} from '../request'
import RobinEditor from '../components/RobinEditor'
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
    this.setState({selectedTags: this.state.selectedTags.concat(tagItem)})
  }
  hideAllTags () {
    setTimeout(() => this.setState({allTagsVisible: false}), 200)
  }
  addNewTag (event) {
    // press Enter
    if (event.keyCode === 13) {
      const value = event.target.value
      if (value && value.trim()) {
        const {allTags, selectedTags} = this.state
        // 是否已经有一样的标签了
        const isAlreadyExisted = allTags.some(item => item.name === value)
        if (isAlreadyExisted) {
          alert('已存在同名标签')
          return
        }
        // add
        let comfitm = confirm(`添加标签 ${value}?`)
        if (confirm) {
          const addingTag = {id: value, name: value}
          this.setState({
            allTags: allTags.concat(addingTag),
            selectedTags: selectedTags.concat(addingTag)
          })
          event.target.value = ''
        }
      }
    }
  }
  async fetchAllTags () {
    const result = await getAllTags()
    if (Array.isArray(result)) this.setState({allTags: result})
  }
  async uploadImage (img, callback) {
    const result = await uploadFile(img)
    callback && callback(result.success ? result.data : false)
  }
  async saveArticle (article) {
    const {id} = this.props.match.params
    const {tags, time} = this.state

    if (id) article.id = id
    if (tags.length > 0 && article.title && article.codeText) {
      article.tags = tags
      if (time) article.time = time
      const {success, data} = await saveArticle(article)
      if (success && data && data.id) {
        utils.addSideTip({text: '保存成功', type: 'success'})
        this.props.history.push(`/article/detail/${data.id}`)
      }
    }
  }

  componentDidMount () {
    this.fetchAllTags()
  }
  render () {
    const {
      state: {inputArticle, selectedTags, allTagsVisible, allTags},
      props: {route}
    } = this

    return <PageWrapper title="编辑文章 · Robin" route={route}>
      <div className="main-article-edit">
        {/* tag */}
        <div className="p-v-10">
          <span>选择标签：</span>
          {
            selectedTags.map((tag, index) => <span className="tag-item pointer" key={tag.id} onClick={() => this.removeSelectedTag(index)}>{tag.name}</span>)
          }
          <div className="tag-add inline-block relative">
            <input type="text"
              onFocus={() => this.setState({allTagsVisible: true})}
              onBlur={() => this.hideAllTags()}
              onKeyDown={e => this.addNewTag(e)} />
            <ul className={`select absolute${allTagsVisible ? '' : ' hide'}`}>
            {
              allTags.map(tag => {
                return selectedTags.indexOf(tag) === -1 ? <li key={tag.name} className="pointer" onClick={() => this.selectTag(tag)}>{tag.name}</li> : null
              })
            }
            </ul>
          </div>
        </div>
        <RobinEditor 
          onUpload={(file, cb) => this.uploadImage(file, cb)}
          value={inputArticle}
          updateValue={(val, cb)=> this.setState({inputArticle: val}, () => cb && cb())}
          onSave={d => this.saveArticle(d)} />
      </div>
    </PageWrapper>
  }
}