const router = require('koa-router')()
router.get('/signIn', async (ctx, next) => {
  await ctx.render('login/login', {
    title: '登录页面'
  })
})
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '主页'
  })
})
router.get('/user/index', async (ctx, next) => {
  await ctx.render('user/index')
})

module.exports = router
