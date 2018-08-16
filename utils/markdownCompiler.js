import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import { RSA_PKCS1_OAEP_PADDING } from 'constants';

const markdownCompiler = new MarkdownIt({html: false, typographer: true})
markdownCompiler.use(require('markdown-it-highlightjs'))
// plugin: header
markdownCompiler.use(markdownItAnchor, {
  level: [1, 2, 3],
  slugify: headerString => `${headerString.replace(/\s/g, '')}`,
  permalink: true,
  callback (token, {title, slug}) {
    headerUtil.add(title, slug, token.tag)
  }
})
// title syntax： [title i am a header title]
const regExtractTitle = /^\[title ([\s\S]+) title]\n/
// antecedent syntax： [A i am an antecedent A]
const regExtractAntecedent = /<A\s([\s\S]+?)\sA>/g
// header funcitons
const headerUtil = {
  headers: [],
  maxLevel: null,
  reset () {
    headerUtil.headers = []
  },
  add (title, slug, level) {
    // if (!headerUtil.headers.length && level !== 'h1') console.warn('first header must be h1')
    headerUtil.headers.push({title, slug, level: +(level[1])})
    // else if (level === 'h1') headerUtil.headers.push({title, slug, children: []})
    // else if (level === 'h2') headerUtil.headers.slice(-1)[0].children.push({title, slug, children: []})
    // else if (level === 'h3') headerUtil.headers.slice(-1)[0].children.slice(-1)[0].children.push({title, slug})
  }
}

function extractTitle (md) {
  let title = null
  const mdWithoutTitle = md.replace(regExtractTitle, ($1, $2) => {
    title = $2
    return ''
  })
  return {title, mdWithoutTitle}
}

function extractAntecedent (md) {
  let antecedent = []
  const mdWithoutAntecedent = md.replace(regExtractAntecedent, function (match, $1) {
    // match p1..pn offset origin
    // 由于箭头函数无绑定的特性，是获取不到 arguments 的，必须要用普通函数
    // console.log(arguments)
    antecedent.push($1)
    return $1 || match
  })
  antecedent = antecedent.join('\n\n')
  return {antecedent, mdWithoutAntecedent}
}

export default function compileMarkdown(md, options) {
  const {title, mdWithoutTitle} = extractTitle(md)
  const {antecedent, mdWithoutAntecedent} = extractAntecedent(mdWithoutTitle)
  headerUtil.reset()
  const compileCode = markdownCompiler.render(mdWithoutAntecedent)
  const headers =headerUtil.headers
  return {
    title, antecedent, compileCode, headers
  }
}
