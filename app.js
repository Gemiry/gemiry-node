const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger') //简单记录log 推荐log4js包
const Token = require('./config/verifyToken')
const pc = require('./routes/index')
const mobile = require('./routes/mobile')
const static = require('./routes/static') //静态页面
const cors = require('@koa/cors')
const session = require('./config/session')
const verifySession = require('./config/verifySession')
//使用session
session(app)
// error handler
onerror(app)

//cors 跨域
app.use(cors())

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

//模板使用
app.use(
  views(__dirname + '/views', {
    map: { html: 'nunjucks' }
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//session校验
app.use(verifySession.verifySession)
//token
app.use(Token.verifyToken)
// routes
app.use(pc.routes(), pc.allowedMethods())
app.use(static.routes(), static.allowedMethods())
app.use(mobile.routes(), mobile.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
