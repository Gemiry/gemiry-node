const db = require('../config/db')
const Sequelize = db.sequelize

const Admin = Sequelize.import('../schema/admin.js')
Admin.sync({ force: false })
class ImgModel {
  /**
   * 创建模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createUser(data) {
    return await Admin.create({
      name: data.name, // 姓名
      password: data.password // 密码
    })
  }
  /**
   * 登录验证
   */
  static async verifyUser(data) {
    return await Admin.findOne({
      where: {
        name: data.name,
        password: data.password
      }
    })
  }
  /**
   *
   * @param {验证是否有用户} id
   */
  static async ifHasUser(name) {
    return await Admin.findOne({
      where: {
        name
      }
    })
  }
  /***
   * 获取用户详情
   */
  static async getUserInfo(id) {
    return await Admin.findOne({
      where: {
        id
      }
    })
  }
}

module.exports = ImgModel
