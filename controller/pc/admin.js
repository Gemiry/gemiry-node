const Admin = require('../../modules/admin')
const JwtUtil = require('../../config/jwt')

class adminController {
  static async create(ctx) {
    let req = ctx.request.body
    if (req.name && req.password) {
      try {
        //创建账户
        let ifHasUser = await Admin.ifHasUser(req.name)
        if (ifHasUser) {
          ctx.body = {
            code: 200,
            mas: '账号已存在'
          }
          return
        }
        await Admin.createUser(req)
        ctx.response.status = 200
        ctx.body = {
          code: 200,
          msg: '创建成功'
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 200,
          msg: '创建账号失败',
          data: err
        }
      }
    } else {
      ctx.body = {
        code: 200,
        msg: '请输入用户名和密码'
      }
    }
  }
  static async verifyUser(ctx) {
    let req = ctx.request.body
    let name = req.name
    let password = req.password
    if (name && password) {
      try {
        let data = await Admin.verifyUser(req)
        ctx.response.status = 200
        if (data) {
          //登录成功
          let _id = data.id.toString()
          // //生成token
          // let jwt = new JwtUtil({
          //   data: _id,
          //   from: /^\/pc\//.test(ctx.req.url) ? 'pc' : 'mobile'
          // })
          // let token = jwt.generateToken()
          //记录session
          ctx.session.id = {
            id: _id,
            name: data.name
          }
          //token 返回给客户端
          ctx.body = {
            code: 200,
            msg: '登录成功'
          }
        } else {
          ctx.body = {
            code: 201,
            msg: '没有该用户哦'
          }
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 412,
          msg: '查询失败',
          err
        }
      }
    } else {
      ctx.response.status = 416
      ctx.body = {
        code: 416,
        msg: '请输入用户名和密码'
      }
    }
  }
}
module.exports = adminController
