import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'

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
// antecedent syntax： [antecedent i am an antecedent antecedent]
const regExtractAntecedent = /\[antecedent (((?!antecedent\]).)+) antecedent]/g
// header funcitons
const headerUtil = {
  headers: [],
  maxLevel: null,
  reset () {
    headerUtil.headers = []
  },
  add (title, slug, level) {
    if (!headerUtil.headers.length && level !== 'h1') console.warn('first header must be h1')
    else if (level === 'h1') headerUtil.headers.push({title, slug, children: []})
    else if (level === 'h2') headerUtil.headers.slice(-1)[0].children.push({title, slug, children: []})
    else if (level === 'h3') headerUtil.headers.slice(-1)[0].children.slice(-1)[0].children.push({title, slug})
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
  const mdWithoutAntecedent = md.replace(regExtractAntecedent, ($1, $2) => {
    // antecedent = (antecedent ? (antecedent + '\n\n') : antecedent) + $2
    antecedent.push($2)
    return $2
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
