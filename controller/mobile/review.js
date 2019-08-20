const User = require('../../modules/user')
const Review = require('../../modules/review')
const Comment = require('../../modules/comment')
const JwtUtil = require('../../config/jwt')

class reviewController {
  static async create(ctx) {
    let req = ctx.request.body
    let token = ctx.request.header.token
    let commentId = req.commentId
    if (req.content && commentId) {
      try {
        let jwt = new JwtUtil({
          data: token,
          from: /^\/pc\//.test(ctx.req.url) ? 'pc' : 'mobile'
        })
        let id = jwt.verifyToken()
        let data = await User.getUserInfo(id)
        //获取用户名和id
        req.reviewId = id
        req.reviewName = data.name
        await Review.create(req)
        //更新评论数量
        let commentData = await Comment.queryOne(commentId)
        let reviewNum = commentData.reviewNum || 0
        reviewNum++
        await Comment.updata({
          id: commentId,
          reviewNum
        })
        ctx.response.status = 200
        ctx.body = {
          code: 200,
          msg: '评论成功'
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 201,
          msg: '评论失败',
          data: err
        }
      }
    } else {
      ctx.body = {
        code: 201,
        msg: '请填写相关内容哦~'
      }
    }
  }
  static async query(ctx) {
    let req = ctx.request.query
    let currentPage = +req.currentPage || 1
    let pageNum = +req.pageNum || 10
    if (req.commentId) {
      try {
        let data = await Review.query({
          commentId: req.commentId,
          currentPage,
          pageNum
        })
        ctx.body = {
          code: 200,
          msg: '成功',
          data,
          nomore: data.length == pageNum
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 201,
          msg: '查询失败咯',
          data: err
        }
      }
    } else {
      ctx.body = {
        code: 201,
        msg: '传参错误'
      }
    }
  }
}
module.exports = reviewController
