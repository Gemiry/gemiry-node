const db = require('../config/db')
const Sequelize = db.sequelize
const Review = Sequelize.import('../schema/review.js')
Review.sync({ force: false })

class reviewModal {
  /**
   * 新建评论
   */
  static async create(data) {
    return await Review.create({
      commentId: data.commentId,
      content: data.content,
      reviewName: data.reviewName,
      reviewId: data.reviewId
    })
  }
  static async query(data) {
    let offset = data.pageNum * (data.currentPage - 1)
    return await Review.findAll({
      offset,
      limit: data.pageNum,
      order: [['id', 'DESC']],
      where: {
        commentId: data.commentId
      }
    })
  }
}
module.exports = reviewModal
