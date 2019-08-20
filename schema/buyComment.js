module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buyComments', {
    //id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  })
}
