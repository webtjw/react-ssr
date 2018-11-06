const path = require('path')
const next = require('next')
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const port = 3002

const nextApp = next({
  dev: process.env.NODE_ENV === 'development',
  dir: path.resolve(__dirname, '.'),
  quiet: true
})
const requestHandler = nextApp.getRequestHandler()

// routes
router.get('/', async (ctx, next) => {
  const { req, res } = ctx
  console.log(`req.url is ${req.url}`)
  await nextApp.render(req, res, '/index')
  await next()
}).get('/article/edit/:id', async (ctx, next) => {
  const { req, res, params } = ctx
  await nextApp.render(req, res, '/articleEdit', { id: params.id })
  await next()
}).get('/article/:id', async (ctx, next) => {
  const { req, res, params } = ctx
  await nextApp.render(req, res, '/articleDetail', { id: params.id })
  await next()
}).get('/tag/:name', async (ctx, next) => {
  const { req, res, params } = ctx
  await nextApp.render(req, res, '/tagItem', { type: params.name })
  await next()
}).all('*', async (ctx, next) => {
  const { req, res, params } = ctx
  await requestHandler(req, res)
  await next()
})
app.use(router.routes()).use(router.allowedMethods())

// start server
nextApp.prepare().then(() => {
  app.listen(port)
})
