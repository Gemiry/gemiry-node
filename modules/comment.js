const _Sequelize = require('sequelize')
const db = require('../config/db')
const Sequelize = db.sequelize
const Comment = Sequelize.import('../schema/comment.js')

const Op = _Sequelize.Op
// Comment.sync({ force: false, alter: true })
class CommentModel {
  /**
   * 创建模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createComment(data) {
    return await Comment.create({
      title: data.title,
      content: data.content,
      introduce: data.introduce,
      details: data.details,
      author: data.author,
      authorId: data.authorId
    })
  }
  /**
   *
   * @param {查询相关文章} data
   */
  static async queryComment(data) {
    let offset = data.pageNum * (data.currentPage - 1)
    if (data.title) {
      return await Comment.findAll({
        offset,
        limit: data.pageNum,
        order: [['id', 'DESC']],
        where: {
          title: {
            [Op.like]: '%' + data.title + '%'
          }
        }
      })
    }
    return await Comment.findAll({
      offset,
      limit: data.pageNum,
      order: [['id', 'DESC']]
    })
  }
  /**
   *
   * @param {更改数据} id
   */
  static async updata({ id, ...data }) {
    console.log(data, 333)
    return await Comment.update(data, {
      where: {
        id
      }
    })
  }
  /**
   *
   * @param {查询一篇文章详情} id
   */
  static async queryOne(id) {
    return await Comment.findOne({
      where: {
        id
      }
    })
  }
}

module.exports = CommentModel
