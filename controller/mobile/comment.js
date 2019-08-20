const User = require('../../modules/user')
const Comment = require('../../modules/comment')
const Like = require('../../modules/like')
const JwtUtil = require('../../config/jwt')

class commentController {
  static async create(ctx) {
    let req = ctx.request.body
    let token = ctx.request.header.token
    if (req.title && req.introduce && req.details) {
      try {
        let jwt = new JwtUtil({
          data: token,
          from: /^\/pc\//.test(ctx.req.url) ? 'pc' : 'mobile'
        })
        let id = jwt.verifyToken()
        let data = await User.getUserInfo(id)
        //获取用户名和id
        req.authorId = id
        req.author = data.name
        await Comment.createComment(req)

        ctx.response.status = 200
        ctx.body = {
          code: 200,
          msg: '创建成功'
        }
      } catch (err) {
        ctx.response.status = 412
        ctx.body = {
          code: 201,
          msg: '创建失败',
          data: err
        }
      }
    }
  }
  //查询文章
  static async query(ctx) {
    let req = ctx.request.query
    let currentPage = +req.currentPage || 1
    let pageNum = +req.pageNum || 10
    try {
      let data = await Comment.queryComment({
        currentPage,
        pageNum,
        title: req.title
      })
      ctx.body = {
        code: 200,
        mas: '成功',
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
  }
  //点赞
  static async like(ctx) {
    let req = ctx.request.body
    let id = req.commentId
    let state = req.state
    let token = ctx.request.header.token

    if (id && state) {
      try {
        let jwt = new JwtUtil({
          data: token,
          from: /^\/pc\//.test(ctx.req.url) ? 'pc' : 'mobile'
        })
        let userId = jwt.verifyToken()
        //查询like数量
        let data = await Comment.queryOne(id)
        //查询用户是否点赞
        let isLike = await Like.query({
          userId: userId,
          commentId: id
        })

        let num = +data.like < 0 ? 0 : data.like
        if (!isLike && state == 1) {
          num++
          await Like.create({
            commentId: id,
            userId: userId
          })
        } else if (isLike && state == 0) {
          num--
          await Like.destroy(isLike.id)
        }

        await Comment.updata({
          like: +num < 0 ? 0 : num,
          id
        })
        ctx.body = {
          code: 200,
          msg: '成功',
          data: true
        }
      } catch (err) {
        ctx.body = {
          code: 201,
          msg: '点赞失败'
        }
      }
    } else {
      ctx.body = {
        code: 201,
        msg: '参数错误'
      }
    }
  }
  //获取文章详情
  static async queryDetail(ctx) {
    let req = ctx.request.query
    let token = ctx.request.header.token
    let { commentId } = req
    if (commentId) {
      let jwt = new JwtUtil({
        data: token,
        from: /^\/pc\//.test(ctx.req.url) ? 'pc' : 'mobile'
      })
      let userId = jwt.verifyToken()
      //查询用户是否点赞
      let isLike = await Like.query({
        userId: userId,
        commentId
      })
      //查询文章
      let commentData = await Comment.queryOne(commentId)
      let redNum = commentData.redNum || 0
      redNum++
      await Comment.updata({
        id: commentId,
        redNum
      })

      ctx.body = {
        code: 200,
        msg: '查询成功',
        data: {
          details: commentData,
          isLike: isLike ? true : false
        }
      }
    } else {
      ctx.body = {
        code: 201,
        msg: '参数错误'
      }
    }
  }
}
module.exports = commentController
