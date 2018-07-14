import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'

const markdownCompiler = new MarkdownIt({html: false, typographer: true})
// plugin: header
let headers = []
const position = {
  false: 'push',
  true: 'unshift'
}
markdownCompiler.use(markdownItAnchor, {
  level: [1, 2],
  slugify: headerString => `${headerString.replace(/\s/g, '')}`,
  permalink: true,
  renderPermalink:  (slug, opts, state, idx) => {
    const space = () => Object.assign(new state.Token('text', '', 0), {content: ' '})
    const linkTokens = [
      Object.assign(new state.Token('link_open', 'a', 1), {
        attrs: [
          ['class', opts.permalinkClass],
          ['href', opts.permalinkHref(slug, state)],
          ['aria-hidden', 'true']
        ]
      }),
      Object.assign(new state.Token('html_block', '', 0), { content: 'caonima' }),
      new state.Token('link_close', 'a', -1)
    ]

    // `push` or `unshift` according to position option.
    // Space is at the opposite side.
    linkTokens[position[!opts.permalinkBefore]](space())
    state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens)
  },
  callback: (token, slug) => {
    // console.log('header archor')
    // console.log('header archor', token, slug)
  }
})
// title 语法： [title 我是一个标题 title]
const regExtractTitle = /^\[title ([\s\S]+) title]\n/
// antecedent 语法： [antecedent 前述 antecedent]
const regExtractAntecedent = /\[antecedent ([^antecedent\]]+) antecedent]/g


function extractTitle (md) {
  let title = null
  const mdWithoutTitle = md.replace(regExtractTitle, ($1, $2) => {
    title = $2
    return ''
  })
  return {title, mdWithoutTitle}
}

function extractAntecedent (md) {
  let antecedent = null
  const mdWithoutAntecedent = md.replace(regExtractAntecedent, ($1, $2) => {
    antecedent = (antecedent || '') + $2
    return $2
  })
  return {antecedent, mdWithoutAntecedent}
}

export default function compileMarkdown(md, options) {
  const {title, mdWithoutTitle} = extractTitle(md)
  const {antecedent, mdWithoutAntecedent} = extractAntecedent(mdWithoutTitle)
  headers = [] // clear the headers array
  const compileCode = markdownCompiler.render(mdWithoutAntecedent)
  debugger
  return {
    title, antecedent, compileCode,
    headers: [
      {
        title: '',
        id: '',
        sub: [
          {title: '', id: ''}
        ]
      }
    ]
  }
}
