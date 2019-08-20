module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'buy',
    {
      //id
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      orderNumber: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.DECIMAL(10, 2)
      },
      name: {
        type: DataTypes.STRING
      }
    },
    { paranoid: true }
  )
}
