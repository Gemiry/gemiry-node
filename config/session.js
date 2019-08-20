const session = require('koa-session')
const redis = require('./redis')

//session相关配置
class Session {
  static create(app) {
    app.keys = ['some secret hurr'] //session加密字段
    const CONFIG = {
      key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
      /** (number || 'session') maxAge in ms (default is 1 days) */
      /** 'session' will result in a cookie that expires when session/browser is closed */
      /** Warning: If a session cookie is stolen, this cookie will never expire */
      maxAge: 86400000,
      autoCommit: true /** (boolean) automatically commit headers (default true) */,
      overwrite: true /** (boolean) can overwrite or not (default true) */,
      httpOnly: true /** (boolean) cookie是否只有服务器端可以访问 httpOnly or not (default true) (default true) */,
      signed: true /** (boolean) signed or not (default true) */,
      rolling: false /** 在每次请求时强行设置cookie，这将重置cookie过期时间(boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
      renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
      store: {
        //储存到redis里面
        get: async function(key, maxAge, { rolling }) {
          let data = await redis.get(key)
          return JSON.parse(data)
        },
        set: async function(key, sess, maxAge, { rolling, changed }) {
          await redis.set(key, JSON.stringify(sess), 'EX', 7200)
        },
        destroy: async function(key) {
          await redis.del(key)
        }
      }
    }
    app.use(session(CONFIG, app))
  }
}

module.exports = Session.create
