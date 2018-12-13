//This part is calling Sequelize for defining what is an order as an object.
module.exports = function(sequelize, DataTypes) {

  var Order = sequelize.define("Order", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deliveryAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isEmail: true
      }
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Order.associate = function(models) {
    Order.belongsTo(models.Product, {
      foreignKey: { allowNull: false }
    });
  };

  return Order;
};
