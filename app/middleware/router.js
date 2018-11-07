const Router = require('koa-router')
const { nextApp, requestHandler } = require('../next')

// routes
const router = new Router()
router.get('/', async (ctx, next) => {
  const { req, res } = ctx
  await nextApp.render(req, res, '/index')
  await next()
}).get('/article/edit/:id?', async (ctx, next) => {
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
  const { req, res } = ctx
  await requestHandler(req, res)
  await next()
})

module.exports = router
