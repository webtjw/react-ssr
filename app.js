const Koa = require('koa')
const app = new Koa()
const router = require('./app/middleware/router')
const { nextApp } = require('./app/next')
const port = 3002

// middlewares
app.use(router.routes())
  .use(router.allowedMethods())

// start server
nextApp.prepare().then(app.listen.bind(app, port))
