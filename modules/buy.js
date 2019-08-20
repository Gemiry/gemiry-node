const db = require('../config/db')
const _Sequelize = require('sequelize')
const Sequelize = db.sequelize

const buy = Sequelize.import('../schema/buy.js')
const comment = Sequelize.import('../schema/comment.js')
// const buyComment = Sequelize.import('../schema/buyComment.js')

buy.belongsTo(comment)
// comment.hasOne(buy)
// comment.belongsToMany(buy, { through: 'buyComment' })
// Sequelize.sync({ force: true })
// buyComment.sync({ force: true })
// buy.sync({ force: true })
class buyModel {
  /**
   * 创建模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createModal(data) {
    return await buy.create({
      orderNumber: data.orderNumber,
      name: data.name,
      price: data.price,
      commentId: 1
    })
  }

  /**
   * 查询用户
   */
  static async getUserPrice(data) {
    let offset = data.pageSize * (data.pageNumber - 1)
    return await buy.findAndCountAll({
      attributes: {
        include: [_Sequelize.col('comment.title')]
      },
      include: [{ model: comment, attributes: [] }],
      offset,
      limit: data.pageSize,
      // attributes: [[_Sequelize.fn('SUM', _Sequelize.col('price')), 'price2']],
      // attributes: {
      //   include: [{ model: comment }]
      // },
      raw: true
      // order: [['id', 'DESC']]
    })
  }
}

module.exports = buyModel
