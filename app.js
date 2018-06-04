const path = require('path')
const express = require('express')
const next = require('next')
const app = express()

const port = 3002
const nextApp = next({
  dev: process.env.NODE_ENV === 'development',
  dir: path.resolve(__dirname, '.'),
  quiet: true
})
const requestHandler = nextApp.getRequestHandler()

const luanchApp = async () => {
  console.log('===>>> SSR 服务启动中')
  await nextApp.prepare()
  console.log('===>>> SSR 服务启动成功')

  app.get('*', (req, res) => {
    const {url} = req

    if (url === '/') nextApp.render(req, res, '/index')
    else requestHandler(req, res, url)
  })

  app.listen(port, err => {if (err) throw err})
  console.log(`\napp 启动完成，监听端口 ${port}`)
}

luanchApp()