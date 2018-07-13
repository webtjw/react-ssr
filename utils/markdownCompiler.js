import MarkdownIt from 'markdown-it'

/*
title 语法： [title 我是一个标题 title]
antecedent 语法：[antecedent 这里是前述的内容 antecedent]。前述 antecedent 可以有多个，多个 antecedent 内容会被拼接起来。
*/
const markdownCompiler = new MarkdownIt({html: false, typographer: true})
// title 语法： [title 我是一个标题 title]
const regExtractTitle = /^\[title ([\s\S]+) title]\n/

const compileMarkdown = async function (md, options) {
  const {title, mdWithoutTitle} = extractTitle(md)
  return {
    title: '',
    antecedent: '',
    headers: [
      {
        title: '',
        id: '',
        sub: [
          {title: '', id: ''}
        ]
      }
    ],
    compileCode: ''
  }
}

function extractTitle (md) {
  let title = null
  const mdWithoutTitle = md.replace(regExtractTitle, ($1, $2) => title = $2)
  return {title, mdWithoutTitle}
}

export default compileMarkdown
module.exports = compileMarkdown
