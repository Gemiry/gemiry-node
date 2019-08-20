module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      //id
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'name'
      },
      //列表
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'token'
      }
    },
    { paranoid: true }
  )
}
