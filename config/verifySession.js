class Session {
  static async verifySession(ctx, next) {
    let req = ctx.request
    if (
      /^(\/mobile\/)|(\/pc\/login\/signIn)/.test(req.url) ||
      req.url == '/signIn'
    ) {
      await next()
    } else {
      if (ctx.session.id) {
        //用户id
        await next()
      } else if (/^(\/pc\/)/.test(req.url)) {
        ctx.response.body = {
          code: 201,
          msg: '登录已过期'
        }
      } else {
        ctx.response.redirect('/signIn')
      }
    }
  }
}

module.exports = Session
