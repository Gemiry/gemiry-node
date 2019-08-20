const router = require('koa-router')()
const LoginController = require('../controller/mobile/login')
const CommentController = require('../controller/mobile/comment')
const ReviewController = require('../controller/mobile/review')
router.prefix('/mobile')

router.post('/signUp', LoginController.create) //注册
router.post('/signIn', LoginController.verifyUser) //登录
router.post('/comment', CommentController.create) //发表文章
router.get('/comment', CommentController.query) //获取文章
router.get('/commentDetail', CommentController.queryDetail) //获取文章详情
router.post('/commentLike', CommentController.like) //点赞
router.post('/review', ReviewController.create) //评论文章
router.get('/review', ReviewController.query) //评论文章

module.exports = router
