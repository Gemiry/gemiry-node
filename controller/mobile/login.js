const User = require('../../modules/user')
const JwtUtil = require('../../config/jwt')

class userController {
  static async create(ctx) {
    let req = ctx.request.body
    if (req.password !== req.confirm_password) {
      ctx.body = { code: 201, msg: '2次密码不相等' }
      return
    }
    if (req.name && req.password) {
      try {
        let ifHasUser = await User.ifHasUser(req.name)
        if (ifHasUser) {
          ctx.body = { code: 201, msg: '用户已存在' }
          return
        }
        //创建账户
        await User.createUser(req)
        ctx.response.status = 200
        ctx.body = {
          code: 200,
          msg: '创建成功'
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 201,
          msg: '创建账号失败',
          data: err
        }
      }
    }
  }
  static async verifyUser(ctx) {
    let req = ctx.request.body

    let name = req.name
    let password = req.password

    if (name && password) {
      try {
        let data = await User.verifyUser(req)
        ctx.response.status = 200
        if (data) {
          //登录成功
          let _id = data.id.toString()
          //生成token
          let jwt = new JwtUtil({
            data: _id,
            from: /^\/pc\//.test(ctx.req.url) ? 'pc' : 'mobile'
          })
          let token = jwt.generateToken()
          //token 返回给客户端
          ctx.body = {
            code: 200,
            msg: '登录成功',
            token: token
          }
        } else {
          ctx.body = {
            code: 201,
            msg: '账号密码错误'
          }
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 412,
          msg: '查询失败',
          data
        }
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: 416,
        msg: 'id必须提供'
      }
    }
  }
}
module.exports = userController
