const JwtUtil = require('./jwt')

class token {
  static async verifyToken(ctx, next) {
    let req = ctx.req
    // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
    //token验证
    if (
      req.url != '/pc/login/signUp' &&
      req.url != '/pc/login/signIn' &&
      req.url != '/mobile/signUp' &&
      req.url != '/mobile/signIn' &&
      /^(\/mobile\/)/.test(req.url)
    ) {
      let token = req.headers.token
      let jwt = new JwtUtil({
        data: token,
        from: /^\/pc\//.test(ctx.req.url) ? 'pc' : 'mobile'
      })
      let result = jwt.verifyToken()
      // 如果考验通过就next，否则就返回登陆信息不正确
      if (result == 'err') {
        ctx.body = { code: 403, msg: '登录已过期,请重新登录' }
      } else {
        await next()
      }
    } else {
      await next()
    }
  }
}
module.exports = token
