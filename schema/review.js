module.exports = function(sequelize, DataTypes) {
  return sequelize.define('review', {
    //id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    commentId: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING
    },
    reviewId: {
      type: DataTypes.INTEGER
    },
    reviewName: {
      type: DataTypes.STRING
    },
    good: {
      type: DataTypes.INTEGER
    },
    bad: {
      type: DataTypes.INTEGER
    }
  })
}
