const db = require('../config/db')
const _Sequelize = require('sequelize')
const Sequelize = db.sequelize

const Op = _Sequelize.Op
const User = Sequelize.import('../schema/user.js')
User.sync({ force: false })
class userModel {
  /**
   * 创建模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createUser(data) {
    return await User.create({
      name: data.name, // 姓名
      password: data.password // 密码
    })
  }
  /**
   * 登录验证
   */
  static async verifyUser(data) {
    return await User.findOne({
      where: {
        name: data.name,
        password: data.password
      }
    })
  }
  /**
   *
   * @param {是否有用户} name
   */
  static async ifHasUser(name) {
    return await User.findOne({
      where: {
        name
      }
    })
  }
  /***
   * 获取用户详情
   */
  static async getUserInfo(id) {
    return await User.findOne({
      where: {
        id
      }
    })
  }
  /**
   * 查询用户
   */
  static async getUserList(data) {
    let offset = data.pageNum * (data.currentPage - 1)
    if (data.name) {
      return await User.findAndCountAll({
        offset,
        limit: data.pageNum,
        // order: [['id', 'DESC']],
        attributes: ['id', 'name', 'createdAt'],
        where: {
          name: {
            [Op.like]: '%' + data.name + '%'
          }
        }
      })
    }
    return await User.findAndCountAll({
      offset,
      limit: data.pageNum,
      attributes: ['id', 'name', 'createdAt']
      // order: [['id', 'DESC']]
    })
  }
}

module.exports = userModel
