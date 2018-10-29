const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

const config = withCSS(withLess())

module.exports =  config