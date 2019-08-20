const db = require('../config/db')
const Sequelize = db.sequelize

const Like = Sequelize.import('../schema/like.js')
// Like.sync({ force: false })
class LikeModel {
  /**
   *
   * @param {点赞文章} data
   */
  static async create(data) {
    return await Like.create({
      commentId: data.commentId,
      userId: data.userId
    })
  }
  /**
   * 查询用户点赞否
   */
  static async query(data) {
    return await Like.findOne({
      where: { userId: data.userId, commentId: data.commentId }
    })
  }
  /**
   *
   * @param {删除点赞} data
   */
  static async destroy(id) {
    return await Like.destroy({
      where: { id }
    })
  }
}

module.exports = LikeModel
