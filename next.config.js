const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')

module.exports = withCSS(withSass({
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config = commonsChunkConfig(config, /\.(sass|scss|css)$/)
    }
    return config
  }
})) // combine multi types of stylesheet