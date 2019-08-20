module.exports = function(sequelize, DataTypes) {
  return sequelize.define('like', {
    //id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    commentId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    }
  })
}
