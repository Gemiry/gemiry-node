module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'comment',
    {
      //id
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'title'
      },
      introduce: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'introduce'
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'details'
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'like'
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'author'
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'authorId'
      },
      redNum: {
        type: DataTypes.INTEGER
      },
      reviewNum: {
        type: DataTypes.INTEGER
      }
    },
    { paranoid: true }
  )
}
