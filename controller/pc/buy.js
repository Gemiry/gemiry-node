const Buy = require('../../modules/buy')

class testController {
  static async create(ctx) {
    let req = ctx.request.body
    if (req.orderNumber && req.price) {
      await Buy.createModal({ ...req, name: ctx.session.id.name })
      ctx.body = {
        code: 200,
        msg: '创建成功'
      }
    } else {
      ctx.body = {
        coder: 201,
        msg: '参数错误'
      }
    }
  }
  static async getUser(ctx) {
    let req = ctx.request.query
    let pageNumber = +req.pageNumber || 1
    let pageSize = +req.pageSize || 10

    try {
      let data = await Buy.getUserPrice({
        pageNumber,
        pageSize
      })
      ctx.response.status = 200
      if (data) {
        ctx.body = {
          code: 200,
          msg: '获取数据成功',
          total: data.count,
          rows: data.rows
        }
      } else {
        ctx.body = {
          code: 201,
          msg: '获取用户失败'
        }
      }
    } catch (err) {
      console.log(err)
      ctx.response.status = 412
      ctx.body = {
        code: 412,
        msg: '查询失败',
        data: err
      }
    }
  }
}
module.exports = testController
