const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')

const config = withCSS(withLess({
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config = commonsChunkConfig(config, /\.(less|css)$/)
    }
    return config
  }
}))

module.exports =  config