const User = require('../../modules/user')

class homeController {
  static async getUser(ctx) {
    let req = ctx.request.query
    let currentPage = +req.pageNumber || 1
    let pageNum = +req.pageSize || 10

    try {
      let data = await User.getUserList({
        currentPage,
        pageNum,
        name: req.searchText
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
      ctx.response.status = 412
      ctx.body = {
        code: 412,
        msg: '查询失败',
        data: err
      }
    }
  }
}
module.exports = homeController
