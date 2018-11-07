import React, { Component } from 'react'
import Router from 'next/router'
import PageWrapper from '../components/PageWrapper'
import { getAllTags, getArticleDetail, saveArticle, uploadFile } from '../request'
import RobinEditor from '../components/RobinEditor'
import '../components/style/article-edit.less'

export default class ArticleEdit extends Component {
  static async getInitialProps (context) {
    const {
      asPath,
      query,
      query: { id }
    } = context
    const props = {
      route: { path: asPath, query },
      articleId: id
    }

    return props
  }

  constructor () {
    super()

    this.state = {
      allTags: [],
      selectedTags: [],
      inputArticle: '',
      allTagsVisible: false
    }

    this.useHistory = false
    this.robinEditorRef = React.createRef()
  }

  removeSelectedTag (index) {
    const {selectedTags} = this.state
    selectedTags.splice(index, 1)
    this.setState({selectedTags})
  }
  selectTag (tagItem) {
    this.setState({selectedTags: this.state.selectedTags.concat(tagItem.name)})
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
            selectedTags: selectedTags.concat(addingTag.name)
          })
          event.target.value = ''
        }
      }
    }
  }
  async fetchAllTags () {
    const result = await getAllTags()
    if (result && result.success) {
      this.setState({
        allTags: result.data
      })
    }
  }
  async uploadImage (img, callback) {
  }
  async saveArticle ({title, antecedent, compileCode}) {
    const id = this.props.articleId
    const {selectedTags, inputArticle} = this.state
    const article = {code: inputArticle, antecedent, title}

    if (id) article.id = id
    if (selectedTags.length > 0 && compileCode) {
      article.tags = selectedTags
      const result = await saveArticle(article)
      if (result) {
        alert('保存成功')
        Router.replace(`/article/${result.id}`)
      } else alert('保存失败，请重试')
    } else alert('未选择标签或未输入有效内容')
  }
  async fetchEditArticleData () {
    const { articleId } = this.props
    if (articleId) {
      const result = await getArticleDetail(articleId)
      if (result && result.success) {
        const articleData = result.data
        if (articleData && !this.useHistory) {
          this.setState({
            inputArticle: articleData.codeText,
            selectedTags: articleData.tags
          }, () => this.robinEditorRef.current.compileMarkdown(articleData.codeText))
        }
      }
    }
  }
  uploadImage = async (img, callback) => {
    const result = await uploadFile(img)
    result && result.success && callback && callback(result.data)
  }

  componentDidMount () {
    this.fetchEditArticleData()
    this.fetchAllTags()
  }
  render () {
    const {
      state: {inputArticle, selectedTags, allTagsVisible, allTags},
      props: {route, developer},
      robinEditorRef
    } = this

    return <PageWrapper title="编辑文章 · Robin" route={route} developer={developer}>
      <div className="main-article-edit">
        {/* tag */}
        <div className="p-v-10">
          <span>选择标签：</span>
          {
            selectedTags.map((tag, index) => <span className="tag-item underline m-r-10 pointer" key={tag} onClick={() => this.removeSelectedTag(index)}>{tag}</span>)
          }
          <div className="tag-add inline-block relative">
            <input type="text" className="p-h-8"
              onFocus={() => this.setState({allTagsVisible: true})}
              onBlur={() => this.hideAllTags()}
              onKeyDown={e => this.addNewTag(e)} />
            <ul className={`select absolute${allTagsVisible ? '' : ' hide'}`}>
            {
              allTags.map(tag => {
                return selectedTags.indexOf(tag.name) === -1 ? <li key={tag.name} className="pointer p-v-8 p-h-10" onClick={() => this.selectTag(tag)}>{tag.name}</li> : null
              })
            }
            </ul>
          </div>
        </div>
        <RobinEditor 
          ref={robinEditorRef}
          onUpload={this.uploadImage}
          value={inputArticle}
          updateValue={(val, cb)=> this.setState({inputArticle: val}, () => cb && cb())}
          onSave={d => this.saveArticle(d)}
          onUseHistory={() => this.useHistory = true} />
      </div>
    </PageWrapper>
  }
}