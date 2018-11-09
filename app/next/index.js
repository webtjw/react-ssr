const path = require('path')
const next = require('next')

const nextApp = next({
  dev: process.env.NODE_ENV === 'development',
  dir: path.resolve(__dirname, '../../'),
  quiet: true
})
const requestHandler = nextApp.getRequestHandler()

module.exports = {
  nextApp,
  requestHandler,
}
